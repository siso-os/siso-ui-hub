'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { HomeIcon, BellIcon, SearchIcon, SettingsIcon, UserIcon } from './Icons.jsx'
import './Dock.css'

gsap.registerPlugin(useGSAP)

/* The default row, used when no `items` are passed — a dock with nothing in it
   is not a useful default, and these five are what the demos show. Pass your
   own to replace them; the shape is { id, label, Icon }. */
const DOCK_ITEMS = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'bell', label: 'Notifications', Icon: BellIcon },
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
  { id: 'user', label: 'Profile', Icon: UserIcon },
]

const DISTANCE_RANGE = 130
const BASE_SIZE = 36       // Baseline item width/height (36px x 36px)
const MAGNIFIED_SIZE = 54  // Magnified item width/height (54px x 54px)
const MAX_Y = -14          // Upward elevation offset

/* Standalone palette. These are the component's own defaults — deliberately
   not tied to any host theme, so an installed copy looks right on day one.
   Pass the props to match your own design; the dock writes them as custom
   properties and the stylesheet reads them from there. */
const SURFACE = '#08101e'      // dock bar and item fill
const BORDER = '#142544'       // bar and tooltip hairline
const ITEM_BORDER = '#0c1f43'  // item hairline, at rest
const ACCENT = '#639aff'       // active item and backlight glow
const ICON = '#ffffff'         // glyphs and tooltip text

/* =========================================================
   DockItem Component (100% Opacity Tooltip + Slide-In & Fade Out)
   ========================================================= */

function DockItem({ item, index, mouseX, activeIndex, onClick, baseSize, magnifiedSize }) {
  const { Icon, label, id } = item
  const itemRef = useRef(null)
  const isActive = activeIndex === index

  // Calculate distance from mouse clientX to item center
  const distance = useTransform(mouseX, (val) => {
    const bounds = itemRef.current?.getBoundingClientRect()
    if (!bounds || val === Infinity) return Infinity
    return val - (bounds.x + bounds.width / 2)
  })

  // Dynamic button size (1:1 square scaling from 36px to 54px)
  const sizeSync = useTransform(
    distance,
    [-DISTANCE_RANGE, 0, DISTANCE_RANGE],
    [baseSize, magnifiedSize, baseSize]
  )

  // Dynamic upward elevation
  const ySync = useTransform(
    distance,
    [-DISTANCE_RANGE, 0, DISTANCE_RANGE],
    [0, MAX_Y, 0]
  )

  // Tooltip opacity: 100% (1.0) while hovering over/near the button, 0% when moving out
  const tooltipOpacitySync = useTransform(distance, (d) => {
    return Math.abs(d) <= 24 ? 1 : 0
  })

  // Tooltip slide offset: 0px when hovered (at 100% opacity), +10px when moving out (slides down & fades out)
  const tooltipYOffsetSync = useTransform(distance, (d) => {
    return Math.abs(d) <= 24 ? 0 : 10
  })

  // Responsive spring physics
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 200, damping: 15 })
  const y = useSpring(ySync, { mass: 0.1, stiffness: 200, damping: 15 })
  const tooltipOpacity = useSpring(tooltipOpacitySync, { mass: 0.1, stiffness: 300, damping: 20 })
  const tooltipYOffset = useSpring(tooltipYOffsetSync, { mass: 0.1, stiffness: 280, damping: 20 })

  // Combine button elevation + tooltip slide offset
  const tooltipY = useTransform([y, tooltipYOffset], ([latestY, latestOffset]) => latestY + latestOffset)

  // Active micro-ripple effect via GSAP on click
  useGSAP(() => {
    if (!isActive || !itemRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      itemRef.current,
      { boxShadow: '0 0 0 0 rgba(34, 34, 34, 0.4)' },
      {
        boxShadow: '0 0 0 8px rgba(34, 34, 34, 0)',
        duration: 0.6,
        ease: 'power2.out',
      }
    )
  }, [isActive])

  return (
    <div className="dock-item-container">
      {/* Tooltip Label - stays at 100% opacity on hover, slides in from bottom, completely fades out on leave */}
      <motion.div
        className="dock-tooltip"
        style={{
          opacity: tooltipOpacity,
          x: '-50%',
          y: tooltipY,
        }}
      >
        {label}
      </motion.div>

      {/* Button container scaling & elevating */}
      <motion.button
        ref={itemRef}
        className={`dock-item${isActive ? ' dock-item--active' : ''}`}
        style={{
          width: size,
          height: size,
          y: y,
        }}
        onClick={() => onClick(index)}
        /* Keyboard focus stands in for the pointer. Magnification and the
           tooltip are both driven by `mouseX`, so pinning it to this item's
           own centre gives a keyboard user the same swell and the same label
           a mouse user gets, through the existing machinery rather than a
           second code path. Pointer-induced focus is skipped, since the
           pointer is already driving mouseX. */
        onFocus={(e) => {
          if (!e.target.matches(':focus-visible')) return
          const r = itemRef.current?.getBoundingClientRect()
          if (r) mouseX.set(r.x + r.width / 2)
        }}
        onBlur={() => mouseX.set(Infinity)}
        whileTap={{ scale: 0.92 }}
        aria-label={label}
        aria-pressed={isActive}
        id={`dock-item-${id}`}
      >
        <Icon size={24} color="currentColor" />
      </motion.button>
    </div>
  )
}

/* =========================================================
   Main Dock Container
   ========================================================= */

export default function Dock({
  /* Content was a module constant, so changing the icons meant editing the
     copied source, and `activeIndex` was internal state with no way out — the
     host could neither set what was selected nor learn that it had changed. */
  items = DOCK_ITEMS,
  activeId,                 // controlled selection, by id
  defaultActiveId = null,   // uncontrolled starting selection
  onSelect,                 // (id, item, index) — fires on every activation

  baseSize = BASE_SIZE,
  magnifiedSize = MAGNIFIED_SIZE,

  // --- paint ---
  surface = SURFACE,
  border = BORDER,
  itemBorder = ITEM_BORDER,
  accent = ACCENT,
  icon = ICON,

  'aria-label': ariaLabel = 'Dock',

  /* The only component in the library that forwarded none of these. Without
     them the dock is position: fixed with no way to place it anywhere else. */
  className = '',
  style,
  ...rest
}) {
  const mouseX = useMotionValue(Infinity)
  const dockRef = useRef(null)

  /* Controlled when `activeId` is given, uncontrolled otherwise — the usual
     React contract, so the host can drive it or ignore it. */
  const [ownId, setOwnId] = useState(defaultActiveId)
  const controlled = activeId !== undefined
  const currentId = controlled ? activeId : ownId
  const activeIndex = items.findIndex((i) => i.id === currentId)

  const handleClick = useCallback(
    (idx) => {
      const item = items[idx]
      if (!item) return
      const next = item.id === currentId ? null : item.id
      if (!controlled) setOwnId(next)
      onSelect?.(next, next === null ? null : item, next === null ? -1 : idx)
    },
    [items, currentId, controlled, onSelect]
  )

  // Initial Entrance Animation using GSAP
  useGSAP(() => {
    if (!dockRef.current) return
    // The dock is chrome, not content: with reduced motion it is simply there.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = dockRef.current.querySelectorAll('.dock-item-container')
    gsap.from(items, {
      y: 50,
      opacity: 0,
      stagger: 0.06,
      duration: 0.6,
      ease: 'back.out(1.5)',
      delay: 0.1,
    })

    gsap.from(dockRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  }, { scope: dockRef })

  return (
    <div
      className={`dock-container ${className}`.trim()}
      ref={dockRef}
      style={{
        '--dock-surface': surface,
        '--dock-border': border,
        '--dock-item-border': itemBorder,
        '--dock-accent': accent,
        '--dock-icon': icon,
        ...style,
      }}
      {...rest}
    >
      {/* Ambient Backlight Glow */}
      <div className="dock-glow" />

      <motion.div
        className="dock"
        /* `group`, not `toolbar`: toolbar carries an arrow-key contract this
           does not implement, and claiming a role you do not honour is worse
           than claiming none. */
        role="group"
        aria-label={ariaLabel}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {items.map((item, idx) => (
          <DockItem
            key={item.id}
            item={item}
            index={idx}
            mouseX={mouseX}
            activeIndex={activeIndex}
            onClick={handleClick}
            baseSize={baseSize}
            magnifiedSize={magnifiedSize}
          />
        ))}
      </motion.div>
    </div>
  )
}
