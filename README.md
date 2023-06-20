## Instructions

### install the dependencies with npm install or pnpm install
### run the project with npm run serve or pnpm run serve

### The project is made using a personal template made in Vue3+Vite, Pinia for the store, Bootstrap as css framework and sass for the style

### In the homepage there are few components, Navigation (as layout component), the sidebar with the TreeView component and the Graph on the right to show the asset's data

### The graph is made using vue-charts lib and for the assets vue I had the idea to use vue-json-tree-view but its an old lib (no types etc..) so I made it custom.

### I made intentionally the use of the store more than passing props, but there are few case also of passing and emitting props.

### In the store I tried to simulate a fetch from an api (using both fetch and axios)

### So when selecting an asset in the sidebar, the charts appears and you are able to see the data, when you select a different asset, few watchers on store variables refresh the data

## I wasn't able to make the sum of the children for those assets that dont have measurements; I didn't understand the logic behind that, because in selecting the Asset 1, the children should be 2 and 3 not, 2 and 4 (4 is a child of the asset 3). 

## No tests no storybook, everything else is there (color picker, no selected asset page etc..)
