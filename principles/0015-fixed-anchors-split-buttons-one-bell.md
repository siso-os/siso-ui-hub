# ADR 0015: Fixed anchors, split buttons, one bell

Status: accepted, round 1 (7 Oct 2026)

> "I have to click agent 0 up top… When I click it, it hits a drop down. As opposed to just going right to the 0"
>
> — Shaan, 6 Oct 22:10 · 28 Jun: the chat place should never change · 23:35: "just a notifications icon which has a little pop up… it pings when a new one comes through. But they're not always showing up top"

- **Things you use on every visit never move:** the chat stays where it is, and Agent Zero's pill stays in the top bar.
- **Split buttons:** the body goes straight to the thing, and a chevron opens the menu.
- **One bell for notifications.** A new one pings briefly (about 4 s) and joins the list. Nothing stays stacked on screen.
- **Screens are drawn from data.** Change the data and the screen follows. No screen is hand-edited for each task ("it shouldn't have to change every single task… through some JSON. And it auto changes", 6 Oct 22:10).

## Check

move across five pages and the chat and Agent Zero's pill keep their exact place. After 10 seconds, no toast is still on screen.
