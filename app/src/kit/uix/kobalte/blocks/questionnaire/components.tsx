import { Check } from "lucide-solid";
import type { JSX } from "solid-js";
import { createEffect, createUniqueId, onCleanup, splitProps } from "solid-js";

import { cn } from "@/arc-shims/kit-utils";
import { buttonVariants } from "../../ui/button";

import {
  QuestionnaireChoiceContext,
  QuestionnaireContext,
  QuestionnaireItemContext,
  useQuestionnaireChoiceContext,
  useQuestionnaireContext,
  useQuestionnaireItemContext,
} from "./context";
import type {
  QuestionnaireActionsProps,
  QuestionnaireChoiceDescriptionProps,
  QuestionnaireChoiceInputProps,
  QuestionnaireChoiceLabelProps,
  QuestionnaireChoiceProps,
  QuestionnaireChoiceShortcutProps,
  QuestionnaireChoicesProps,
  QuestionnaireDescriptionProps,
  QuestionnaireErrorProps,
  QuestionnaireInputProps,
  QuestionnaireItemProps,
  QuestionnaireNavigationProps,
  QuestionnaireNextProps,
  QuestionnairePreviousProps,
  QuestionnaireProgressProps,
  QuestionnaireRootProps,
  QuestionnaireSkipProps,
  QuestionnaireSubmitProps,
  QuestionnaireTitleProps,
} from "./types";
import { createQuestionnaireChoice } from "./use-questionnaire-choice";
import { createQuestionnaireInput } from "./use-questionnaire-input";
import { createQuestionnaireItem } from "./use-questionnaire-item";
import { createQuestionnaireRoot } from "./use-questionnaire-root";

const QuestionnaireRoot = (props: QuestionnaireRootProps) => {
  const [local, others] = splitProps(props, [
    "children",
    "class",
    "defaultItem",
    "item",
    "items",
    "noValidate",
    "onItemChange",
    "onKeyDown",
    "onReset",
    "onSubmit",
    "ref",
    "shortcuts",
  ]);

  const { context, rootProps } = createQuestionnaireRoot(local);

  return (
    <QuestionnaireContext.Provider value={context}>
      <form
        data-slot="questionnaire"
        data-current={context.current}
        data-first={context.first ? "" : undefined}
        data-last={context.last ? "" : undefined}
        data-shortcuts={local.shortcuts}
        data-total={context.total}
        class={cn("z-questionnaire flex w-full min-w-0 flex-col", local.class)}
        noValidate={local.noValidate ?? true}
        {...rootProps}
        {...others}
      >
        {local.children}
      </form>
    </QuestionnaireContext.Provider>
  );
};

const QuestionnaireProgress = (props: QuestionnaireProgressProps) => {
  const context = useQuestionnaireContext("Questionnaire.Progress");
  const [local, others] = splitProps(props, ["children", "class"]);
  const label = () =>
    context.total ? `Question ${context.current} of ${context.total}` : undefined;
  const content = () => {
    const children = local.children;

    if (typeof children === "function") {
      return children({
        current: context.current,
        first: context.first,
        last: context.last,
        total: context.total,
      });
    }

    return children ?? label();
  };

  return (
    <div
      data-slot="questionnaire-progress"
      role="progressbar"
      aria-label="Questionnaire progress"
      aria-live="polite"
      aria-valuemax={context.total || undefined}
      aria-valuemin={context.total ? 1 : undefined}
      aria-valuenow={context.total ? context.current : undefined}
      aria-valuetext={label()}
      data-current={context.current}
      data-first={context.first ? "" : undefined}
      data-last={context.last ? "" : undefined}
      data-total={context.total}
      class={cn(
        "z-questionnaire-progress text-muted-foreground min-h-lh w-fit min-w-[14ch] font-medium tabular-nums",
        local.class,
      )}
      {...others}
    >
      {content()}
    </div>
  );
};

const QuestionnaireItem = (props: QuestionnaireItemProps) => {
  const [local, others] = splitProps(props, [
    "aria-describedby",
    "aria-keyshortcuts",
    "children",
    "class",
    "disabled",
    "invalid",
    "multiple",
    "name",
    "onStatusChange",
    "ref",
    "required",
  ]);

  const { context, itemProps, state } = createQuestionnaireItem(local);

  return (
    <QuestionnaireItemContext.Provider value={context}>
      <fieldset
        data-slot="questionnaire-item"
        data-active={state.active ? "" : undefined}
        data-disabled={state.disabled ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        data-multiple={state.multiple ? "" : undefined}
        data-required={state.required ? "" : undefined}
        data-status={state.status}
        class={cn("z-questionnaire-item min-w-0 border-0 p-0 outline-none", local.class)}
        {...itemProps}
        {...others}
      >
        {local.children}
      </fieldset>
    </QuestionnaireItemContext.Provider>
  );
};

const QuestionnaireTitle = (props: QuestionnaireTitleProps) => {
  useQuestionnaireItemContext("Questionnaire.Title");
  const [local, others] = splitProps(props, ["class"]);

  return (
    <legend
      data-slot="questionnaire-title"
      class={cn("z-font-heading z-questionnaire-title text-pretty", local.class)}
      {...others}
    />
  );
};

const QuestionnaireDescription = (props: QuestionnaireDescriptionProps) => {
  const itemContext = useQuestionnaireItemContext("Questionnaire.Description");
  const [local, others] = splitProps(props, ["class", "id"]);
  const generatedId = createUniqueId();
  const descriptionId = () => local.id ?? generatedId;

  createEffect(() => {
    onCleanup(itemContext.registerDescription(descriptionId()));
  });

  return (
    <p
      data-slot="questionnaire-description"
      id={descriptionId()}
      class={cn("z-questionnaire-description text-muted-foreground text-pretty", local.class)}
      {...others}
    />
  );
};

const QuestionnaireChoices = (props: QuestionnaireChoicesProps) => {
  const itemContext = useQuestionnaireItemContext("Questionnaire.Choices");
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="questionnaire-choices"
      data-shortcuts={itemContext.shortcuts ?? undefined}
      class={cn("group/questionnaire-choices z-questionnaire-choices grid min-w-0", local.class)}
      {...others}
    />
  );
};

const QuestionnaireChoice = (props: QuestionnaireChoiceProps) => {
  const [local, others] = splitProps(props, [
    "checked",
    "children",
    "class",
    "defaultChecked",
    "disabled",
    "onChange",
    "value",
  ]);

  const choiceContext = createQuestionnaireChoice(local);
  const state = choiceContext.state;

  return (
    <QuestionnaireChoiceContext.Provider value={choiceContext}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: QuestionnaireChoiceInput renders the native input inside the label. */}
      <label
        data-slot="questionnaire-choice"
        data-checked={state.checked ? "" : undefined}
        data-unchecked={state.checked ? undefined : ""}
        data-disabled={state.disabled ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        data-shortcut={state.shortcut ?? undefined}
        data-type={state.type}
        class={cn(
          "group/questionnaire-choice z-questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none",
          "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
          local.class,
        )}
        {...others}
      >
        <QuestionnaireChoiceInput />
        <span
          aria-hidden="true"
          data-slot="questionnaire-choice-indicator"
          class="z-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
        >
          <span
            data-slot="questionnaire-choice-indicator-dot"
            class="z-questionnaire-choice-indicator-dot hidden rounded-full group-data-checked/questionnaire-choice:block group-data-[type=checkbox]/questionnaire-choice:hidden"
          />
          <Check
            data-slot="questionnaire-choice-indicator-check"
            class="z-questionnaire-choice-indicator-check hidden group-data-checked/questionnaire-choice:block group-data-[type=radio]/questionnaire-choice:hidden"
          />
        </span>
        <QuestionnaireChoiceLabel>{local.children}</QuestionnaireChoiceLabel>
        <QuestionnaireChoiceShortcut />
      </label>
    </QuestionnaireChoiceContext.Provider>
  );
};

const QuestionnaireChoiceInput = (props: QuestionnaireChoiceInputProps) => {
  const choiceContext = useQuestionnaireChoiceContext("Questionnaire.ChoiceInput");
  const [local, others] = splitProps(props, ["class", "ref"]);
  const [inputRef, inputProps] = splitProps(choiceContext.inputProps, ["ref"]);
  const state = choiceContext.state;

  return (
    <input
      data-slot="questionnaire-choice-input"
      data-checked={state.checked ? "" : undefined}
      data-unchecked={state.checked ? undefined : ""}
      data-disabled={state.disabled ? "" : undefined}
      data-invalid={state.invalid ? "" : undefined}
      data-shortcut={state.shortcut ?? undefined}
      data-type={state.type}
      class={cn(
        "z-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0",
        local.class,
      )}
      {...inputProps}
      {...others}
      ref={(element) => {
        inputRef.ref(element);
        local.ref?.(element);
      }}
    />
  );
};

const QuestionnaireChoiceLabel = (props: QuestionnaireChoiceLabelProps) => {
  useQuestionnaireChoiceContext("Questionnaire.ChoiceLabel");
  const [local, others] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="questionnaire-choice-label"
      class={cn(
        "z-questionnaire-choice-content z-questionnaire-choice-label flex min-w-0 flex-1 flex-col leading-snug",
        local.class,
      )}
      {...others}
    />
  );
};

const QuestionnaireChoiceShortcut = (props: QuestionnaireChoiceShortcutProps) => {
  const choiceContext = useQuestionnaireChoiceContext("Questionnaire.ChoiceShortcut");
  const [local, others] = splitProps(props, ["children", "class"]);

  return (
    <span
      aria-hidden="true"
      data-slot="questionnaire-choice-shortcut"
      data-shortcut={choiceContext.state.shortcut ?? undefined}
      hidden={choiceContext.state.shortcut === null}
      class={cn(
        "z-questionnaire-choice-shortcut z-questionnaire-shortcut pointer-events-none ms-auto hidden shrink-0 group-data-shortcut/questionnaire-choice:inline-flex",
        local.class,
      )}
      {...others}
    >
      {local.children ?? choiceContext.state.shortcut}
    </span>
  );
};

const QuestionnaireChoiceDescription = (props: QuestionnaireChoiceDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="questionnaire-choice-description"
      class={cn("z-questionnaire-choice-description", local.class)}
      {...others}
    />
  );
};

const QuestionnaireInput = (props: QuestionnaireInputProps) => {
  const [local, others] = splitProps(props, [
    "class",
    "defaultValue",
    "disabled",
    "onInput",
    "ref",
    "type",
    "value",
  ]);

  const { inputProps, state } = createQuestionnaireInput(local);

  return (
    <div
      data-slot="questionnaire-input-wrapper"
      class="group/questionnaire-input z-questionnaire-input-wrapper relative min-w-0"
    >
      <input
        data-slot="questionnaire-input"
        data-disabled={state.disabled ? "" : undefined}
        data-empty={state.filled ? undefined : ""}
        data-filled={state.filled ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        class={cn(
          "z-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0",
          "selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
          local.class,
        )}
        {...inputProps}
        {...others}
      />
    </div>
  );
};

const QuestionnaireError = (props: QuestionnaireErrorProps) => {
  const itemContext = useQuestionnaireItemContext("Questionnaire.Error");
  const [local, others] = splitProps(props, ["children", "class", "id"]);
  const generatedId = createUniqueId();
  const errorId = () => local.id ?? generatedId;

  createEffect(() => {
    onCleanup(itemContext.registerError(errorId()));
  });

  return (
    <p
      data-slot="questionnaire-error"
      data-invalid={itemContext.invalid ? "" : undefined}
      hidden={!itemContext.invalid}
      id={errorId()}
      role={itemContext.invalid ? "alert" : undefined}
      class={cn("z-questionnaire-error text-destructive", local.class)}
      {...others}
    >
      {local.children ??
        (itemContext.required
          ? "Choose an answer to continue."
          : "Choose an answer or skip this question.")}
    </p>
  );
};

const QuestionnaireActions = (props: QuestionnaireActionsProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="questionnaire-actions"
      class={cn(
        "z-questionnaire-actions grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center",
        local.class,
      )}
      {...others}
    />
  );
};

type QuestionnaireNavigationButtonProps = QuestionnaireNavigationProps & {
  defaultChildren: string;
  navigationClass: string;
  shortcut?: "Enter";
  slotName: string;
  visible: boolean;
};

const QuestionnaireNavigationButton = (props: QuestionnaireNavigationButtonProps) => {
  const context = useQuestionnaireContext("Questionnaire.NavigationButton");
  const [local, others] = splitProps(props, [
    "children",
    "class",
    "defaultChildren",
    "disabled",
    "navigationClass",
    "shortcut",
    "size",
    "slotName",
    "tabIndex",
    "type",
    "variant",
    "visible",
  ]);

  const disabled = () => local.disabled ?? false;
  const activeShortcut = () => (local.visible && !disabled() ? (local.shortcut ?? null) : null);

  return (
    <button
      data-slot={local.slotName}
      data-size={local.size ?? "default"}
      data-variant={local.variant ?? "default"}
      aria-hidden={!local.visible || undefined}
      aria-keyshortcuts={activeShortcut() ?? undefined}
      data-disabled={disabled() ? "" : undefined}
      data-shortcut={activeShortcut() ?? undefined}
      data-status={context.activeItemStatus ?? undefined}
      data-visible={local.visible ? "" : undefined}
      data-hidden={local.visible ? undefined : ""}
      disabled={disabled()}
      hidden={!local.visible}
      inert={!local.visible}
      tabIndex={local.visible ? local.tabIndex : -1}
      type={local.type ?? "button"}
      class={cn(
        buttonVariants({
          size: local.size ?? "default",
          variant: local.variant ?? "default",
        }),
        local.navigationClass,
        local.class,
      )}
      {...others}
    >
      {local.children ?? local.defaultChildren}
    </button>
  );
};

const QuestionnairePrevious = (props: QuestionnairePreviousProps) => {
  const context = useQuestionnaireContext("Questionnaire.Previous");
  const [local, others] = splitProps(props, ["onClick", "variant"]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    if (!event.defaultPrevented) {
      context.goPrevious();
    }
  };

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Previous"
      navigationClass="z-questionnaire-previous col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0"
      onClick={handleClick}
      slotName="questionnaire-previous"
      variant={local.variant ?? "outline"}
      visible={context.total > 1 && !context.first}
      {...others}
    />
  );
};

const QuestionnaireSkip = (props: QuestionnaireSkipProps) => {
  const context = useQuestionnaireContext("Questionnaire.Skip");
  const [local, others] = splitProps(props, ["onClick", "variant"]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    if (!event.defaultPrevented) {
      context.skipCurrent();
    }
  };

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Skip"
      navigationClass="z-questionnaire-skip col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0"
      onClick={handleClick}
      slotName="questionnaire-skip"
      variant={local.variant ?? "outline"}
      visible={context.activeItemRequired === false}
      {...others}
    />
  );
};

const QuestionnaireNext = (props: QuestionnaireNextProps) => {
  const context = useQuestionnaireContext("Questionnaire.Next");
  const [local, others] = splitProps(props, ["onClick"]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    if (!event.defaultPrevented) {
      context.goNext();
    }
  };

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Next"
      navigationClass="z-questionnaire-next col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0"
      onClick={handleClick}
      shortcut="Enter"
      slotName="questionnaire-next"
      visible={context.total > 1 && !context.last}
      {...others}
    />
  );
};

const QuestionnaireSubmit = (props: QuestionnaireSubmitProps) => {
  const context = useQuestionnaireContext("Questionnaire.Submit");
  const [local, others] = splitProps(props, ["type"]);

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Submit"
      navigationClass="z-questionnaire-submit col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0"
      shortcut="Enter"
      slotName="questionnaire-submit"
      type={local.type ?? "submit"}
      visible={context.total > 0 && context.last}
      {...others}
    />
  );
};

export {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoiceInput,
  QuestionnaireChoiceLabel,
  QuestionnaireChoiceShortcut,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireRoot,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
};
