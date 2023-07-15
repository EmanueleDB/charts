## Charts

A simple exercise using fake data and displaying an asset tree and a charts.

id and parentId is the connection between assets and when the parentId is the same of an id it will become a child in the assets tree. (see assets.json)

When clicking on an asset the chart on the right will be shown and it will display the measurement data of the asset. (see measurements.json)
If an asset (assetId) is missing from the list, the chart will show the sum of all its children.

#### Technology used: Vue3, Vite, Pinia, Bootstrap, Sass.
