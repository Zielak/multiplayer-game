TODO: document this API

### Sizes

All cards and containers should have a defined real-like dimensions. Classic playing cards are about 5,6 cm x 8,7 cm (at least here in Europe). 

There are 2 units of dimensions now:

- length
- width

NOTE: There's no such property as `height`, I didn't make a 3D game framework.

Table sets the whole playground. It also should have a real-like dimensions, default table is 55 cm wide and 55 cm long. Table should fill the whole screen, so if it's larger, then the renderer should scale the whole view down. All game elements will get smaller, but should also be accessible, eg. zoom in on hover.

Cards in Hand don't need to follow this rule, those in real-life are kept close to our eyes, regardless of the size of the table.

Client-side renderer should follow those rules. Renderer could play around using some 3D or CSS perspective.

I don't yet know how will it play out on mobile devices/small screens.

## Table

## Containers

## Cards


