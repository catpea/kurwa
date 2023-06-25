{
  "id": 1,
  "owner": 1,
  "parent": null,
  "created": "2023-06-24T00:22:55.469Z",
  "updated": "2023-06-24T00:22:55.469Z",
  "revision": null,
  "cache": null,
  "data": null,
  "tags": null,
  "name": "root",
  "type": null,
  "extends": null,
  "description": "Hello, this is root speaking...",
  "top": null,
  "left": null,
  "order": null,
  "input": [],
  "output": [],
  "properties": null,
  "values": null,
  "program": null,
  "validate": null,
  "test": null,
  "edges": [
    {
      "id": "a",
      "source": 2,
      "output": "out",
      "destination": 3,
      "input": "in",
      "color": "gold"
    }
  ]
}













{
  "id": 2,
  "owner": 1,
  "parent": 1,
  "created": "2023-06-24T00:22:55.469Z",
  "updated": "2023-06-24T00:22:55.469Z",
  "revision": null,
  "cache": null,
  "data": null,
  "tags": null,
  "name": "Text Data",
  "type": null,
  "extends": null,
  "description": null,
  "top": 86.18656630880866,
  "left": 51.55969892642601,
  "order": null,
  "input": [
    {
      "id": "in",
      "name": "Input",
      "top": 203.0014860650553,
      "left": 104.8287236544463
    },
    {
      "id": "transform",
      "name": "Transform",
      "top": 235.0014860650553,
      "left": 104.8287236544463
    },
    {
      "id": "order",
      "name": "Order",
      "top": 267.0014860650553,
      "left": 104.8287236544463
    }
  ],
  "output": [
    {
      "id": "out",
      "name": "Output",
      "top": 117.75297564655878,
      "left": 313.8287236544463
    },
    {
      "id": "debug",
      "name": "Debug",
      "top": 164.75297564655878,
      "left": 313.8287236544463
    }
  ],
  "properties": null,
  "values": null,
  "program": null,
  "validate": null,
  "test": null,
  "edges": []
}

















{
  "id": 3,
  "owner": 1,
  "parent": 1,
  "created": "2023-06-24T00:22:55.469Z",
  "updated": "2023-06-24T00:22:55.469Z",
  "revision": null,
  "cache": null,
  "data": null,
  "tags": null,
  "name": "Print Text",
  "type": null,
  "extends": null,
  "description": null,
  "top": 60.81343369119133,
  "left": 493.440301073574,
  "order": null,
  "input": [
    {
      "id": "in",
      "name": "Input",
      "top": 96.99759486101675,
      "left": 398.83091713725656
    },
    {
      "id": "transform",
      "name": "Transform",
      "top": 128.99758380392325,
      "left": 398.83091713725656
    },
    {
      "id": "order",
      "name": "Order",
      "top": 160.99758380392325,
      "left": 398.83091713725656
    }
  ],
  "output": [
    {
      "id": "out",
      "name": "Output",
      "top": 58.74637017733809,
      "left": 607.8309171372566
    },
    {
      "id": "debug",
      "name": "Debug",
      "top": 156.75,
      "left": 568.8333333333334
    }
  ],
  "properties": null,
  "values": null,
  "program": null,
  "validate": null,
  "test": null,
  "edges": []
}
