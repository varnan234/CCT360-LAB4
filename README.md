# Plant Sitter

Lab 4 for CCT360. You're looking after a friend's plant for 7 days. Each day you pick one thing to do (water it, move it to the window, or leave it alone), and the page uses if statements to work out how the plant is doing.

How it works:
- `water`, `sun` and `health` are variables that change with every choice, plus random weather each day
- `checkStatus()` decides if the plant is happy, thirsty, drowning, droopy or scorched, and the picture changes to match
- after 7 days (or if health hits 0) there are 4 endings: bloomed, made it, barely made it, or dead
- localStorage remembers your last plant, so the welcome message is different when you come back

Live site: https://varnan234.github.io/CCT360-LAB4/

## Photo credits

All photos are from Unsplash (free to use under the Unsplash License), cropped to squares.

- happy.jpg - Jane Duursma, https://unsplash.com/photos/green-plant-on-brown-pot-lBdd3MXAZ_s
- thirsty.jpg - Sharanya Dilip, https://unsplash.com/photos/brown-flower-in-black-pot-vFXhWT2qOQg
- drowning.jpg - Nicolas Horn, https://unsplash.com/photos/green-plant-in-blue-plastic-pot-FiZPMqqNFwA
- droopy.jpg - Kelly Sikkema, https://unsplash.com/photos/croton-plant-near-green-orchid-plant-aCnAxrwaesI
- bloom.jpg - Lazar Cvetanovic, https://unsplash.com/photos/african-violet-with-purple-flowers-MMnC0qZS5Xo
- dead.jpg - Khalil, https://unsplash.com/photos/brown-powder-on-green-round-container-3j0zQe5EAyo
