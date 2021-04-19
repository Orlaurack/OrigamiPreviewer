export interface Shape{
  'front-face': boolean;
  'z-index': number;
  coords: {
    readonly x: number,
    readonly y: number,
    readonly z?: number
  }[];
}

export interface Step {
  readonly text: string;
  back?: boolean;
  readonly shapes: Shape[];
  readonly 'rotation'?: boolean;
  readonly 'marking-fold'?: boolean;
  readonly 'v-fold'?: boolean;
  readonly 'move-index'?: [number, number][];
  readonly 'fold-index'?: [number, number][];
  readonly 'lasts-fold'?: [number, number][];
}
export class Steps{
  steps: Readonly<Step[]>;
  constructor(){
    this.steps = [
      {
        text: 'Marquez le coté du bas sur celui du haut.',
        shapes: [
          {
            'front-face': true,
            'z-index': 0,
            coords: [
              {x: -1, y: -1, z: 0},
              {x: -1, y:  0, z: 0},
              {x: -1, y:  1, z: 0},
              {x:  1, y:  1, z: 0},
              {x:  1, y:  0, z: 0},
              {x:  1, y: -1, z: 0}
            ]
          },
          {
            'front-face': false,
            'z-index': -1,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: -1, y: 1, z: 0},
              {x:  1, y: 1, z: 0},
              {x:  1, y: 0, z: 0}
            ]
          }
        ],
        'marking-fold': true,
        'v-fold': true,
        'move-index': [[0, 2], [0, 3], [1, 1], [1, 2]],
        'fold-index': [[0, 1], [0, 4]],
        'lasts-fold': []
      },
      {
        text: 'Pliez le coté du bas droit sur le centre.',
        shapes: [
          {
            'z-index': -1,
            'front-face': true,
            coords: [
              {x: -1, y: -1, z: 0},
              {x: -1, y:  0, z: 0},
              {x: -1, y:  1, z: 0},
              {x:  0, y:  1, z: 0},
              {x:  1, y:  1, z: 0},
              {x:  1, y:  0, z: 0},
              {x:  1, y: -1, z: 0}
            ]
          },
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x:  0, y:  1, z: 0},
              {x:  1, y:  1, z: 0},
              {x:  1, y:  0, z: 0}
            ]
          }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[0, 4], [1, 1]],
        'fold-index': [[0, 3], [0, 5]],
        'lasts-fold': [[0, 1], [0, 5]]
      },
      {
        text: 'Pliez le coté du haut gauche sur le centre.',
        shapes: [
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x:  0, y:  1, z: 0},
              {x:  1, y:  0, z: 0},
              {x:  0, y:  0, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y: -1, z: 0},
              {x: -1, y:  0, z: 0},
              {x: -1, y:  1, z: 0},
              {x:  0, y:  1, z: 0},
              {x:  1, y:  0, z: 0},
              {x:  1, y: -1, z: 0},
              {x:  0, y: -1, z: 0}
            ]
          },
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x:  -1, y:  -1, z: 0},
              {x:  -1, y:  0, z: 0},
              {x:  0, y:  -1, z: 0}
            ]
          }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[1, 0], [2, 0]],
        'fold-index': [[1, 6], [1, 1]],
        'lasts-fold': [[1, 1], [1, 4]]
      },
      {
        text: 'Pliez a nouveau le centre.',
        shapes: [
            {
              'z-index': 1,
              'front-face': false,
              coords: [
                {x:  0, y:  1, z: 0},
                {x:  1, y:  0, z: 0},
                {x:  0, y:  0, z: 0}
              ]
            },
            {
              'z-index': 1,
              'front-face': false,
              coords: [
                {x:  0, y:  -1, z: 0},
                {x:  -1, y:  0, z: 0},
                {x:  0, y:  0, z: 0}
              ]
            },
            {
              'z-index': 1,
              'front-face': true,
              coords: [
                {x: -1, y:  0, z: 0},
                {x:  1, y:  0, z: 0},
                {x:  1, y: -1, z: 0},
                {x:  0, y: -1, z: 0}
              ]
            },
            {
              'z-index': -2,
              'front-face': false,
              coords: [
                {x: -1, y:  0, z: 0},
                {x: -1, y:  1, z: 0},
                {x:  0, y:  1, z: 0},
                {x:  1, y:  0, z: 0}
              ]
            },
            {
              'z-index': -1,
              'front-face': true,
              coords: [
                {x: -1, y:  0, z: 0},
                {x: -1, y:  1, z: 0},
                {x:  0, y:  1, z: 0},
                {x:  1, y:  0, z: 0}
              ]
            }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[3, 1], [3, 2], [4, 1], [4, 2], [0, 0]],
        'fold-index': [[3, 0], [3, 3]],
        'lasts-fold': []
      },
      {
        text: '.',
        shapes: [
            {
              'z-index': 0,
              'front-face': false,
              coords: [
                {x: -1, y:  0, z: 0},
                {x:  1, y:  0, z: 0},
                {x:  0, y:  -1, z: 0},
                {x: -1, y:  -1, z: 0},
                {x: -1, y: -.83, z: 0}
              ]
            },
            {
              'z-index': 0,
              'front-face': false,
              coords: [
                {x: -1, y:  0, z: 0},
                {x:  0, y: -1, z: 0},
                {x:  0, y:  0, z: 0}
              ]
            },
            {
              'z-index': 0,
              'front-face': true,
              coords: [
                {x: -1, y:  0, z: 0},
                {x:  1, y:  0, z: 0},
                {x:  1, y:  -1, z: 0},
                {x:  0, y:  -1, z: 0}
              ]
            },
            {
              'z-index': -1,
              'front-face': true,
              coords: [
                {x:  0, y: -.415, z: 0},
                {x: -1, y: -.83, z: 0},
                {x: -1, y: -1, z: 0},
                {x:  0, y: -1, z: 0}
              ]
            },
            {
              'z-index': -1,
              'front-face': false,
              coords: [
                {x:  0, y: -.415, z: 0},
                {x:  0, y: -1, z: 0},
                {x:  1, y:  0, z: 0}
              ]
            }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[0, 2], [0, 3], [3, 2], [3, 3], [4, 1]],
        'fold-index': [[0, 1], [0, 4]],
        'lasts-fold': []
      },
      {
        text: '..',
        shapes: [
            {
              'z-index': 2,
              'front-face': true,
              coords: [
                {x:  0, y: -.415, z: 0},
                {x: -1, y: -.83, z: 0},
                {x: -1.13, y:  -.71, z: 0},
                {x: -.414, y: 0, z: 0}
              ]
            },
            {
              'z-index': 1,
              'front-face': false,
              coords: [
                {x:  1, y:  0, z: 0},
                {x:  -1, y:  0, z: 0},
                {x:  -1, y:  -.83, z: 0},
              ]
            },
            {
              'z-index': 0,
              'front-face': false,
              coords: [
                {x:  0, y: -.415, z: 0},
                {x: -1, y: -.83, z: 0},
                {x: -1.13, y:  -.71, z: 0},
                {x: -.414, y: 0, z: 0}
              ]
            },
            {
              'z-index': -1,
              'front-face': true,
              coords: [
                {x:  1, y:  0, z: 0},
                {x:  -1, y:  0, z: 0},
                {x:  -1, y:  -.83, z: 0},
              ]
            },
            {
              'z-index': -2,
              'front-face': true,
              coords: [
                {x:  1, y:  0, z: 0},
                {x:  1, y: -1, z: 0},
                {x:  0, y: -1, z: 0},
                {x:  0, y:  0, z: 0}
              ]
            },
            {
              'z-index': -3,
              'front-face': false,
              coords: [
                {x: -1, y:  0, z: 0},
                {x:  0, y: -1, z: 0},
                {x:  1, y: -1, z: 0},
                {x:  1, y:  0, z: 0},
              ]
            }
        ],
        rotation: true,

        'marking-fold': false,
        'v-fold': true,
        'move-index': [],
        'fold-index': [],
        'lasts-fold': []
      },
      {
        text: '...',
        shapes: [
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y:  0, z: 0},
              {x: -1, y: -.83, z: 0},
              {x: -1, y: -1, z: 0},
              {x:  0, y: -1, z: 0},
              {x: 1, y:  0, z: 0}
            ]
          },
          {
            'z-index': -1,
            'front-face': true,
            coords: [
              {x: -1, y:  -.83, z: 0},
              {x: -1, y: -1, z: 0},
              {x:  0, y: -1, z: 0},
              {x:  0, y: -.415, z: 0}
            ]
          },
          {
            'z-index': -2,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 1, y: 0, z: 0},
              {x: 0, y: -1, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 1, y:  0, z: 0},
              {x: 1, y:  0, z: 0},
              {x: 1, y:  0, z: 0}

            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y:   0, z: 0},
              {x:  1, y:   0, z: 0},
              {x:  1, y:  -.83, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [

              {x: 0, y: -.415, z: 0},
              {x: 1, y: -.83, z: 0},
              {x: 1.13, y:  -.71, z: 0},
              {x: .414, y: 0, z: 0}
            ]
          }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[0, 2], [0, 3], [1, 1], [1, 2], [2, 2]],
        'fold-index': [[0, 1], [0, 4]],
        'lasts-fold': []
      },
      {
        text: '....',
        shapes: [
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  0, y: -.414, z: 0},
              {x:  0, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  1, y: -.83, z: 0},
              {x:  1, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 1, y: -.83, z: 0},
              {x: 1.13, y:  -.71, z: 0},
              {x: .414, y: 0, z: 0}
            ]
          },
          {
            'z-index': 5,
            'front-face': true,
            coords: [
              {x:  0, y: -.415, z: 0},
              {x: -1, y: -.83, z: 0},
              {x: -1.13, y:  -.71, z: 0},
              {x: -.414, y: 0, z: 0}
            ]
          },
          {
            'z-index': 4,
            'front-face': false,
            coords: [
              {x:  1, y:  0, z: 0},
              {x:  -1, y:  0, z: 0},
              {x:  -1, y:  -.83, z: 0},
            ]
          },
          {
            'z-index': 3,
            'front-face': true,
            coords: [
              {x:  1, y:  0, z: 0},
              {x:  -1, y:  0, z: 0},
              {x:  -1, y:  -.83, z: 0},
              {x:  0, y:  -.415, z: 0},
            ]
          },
          {
            'z-index': 4,
            'front-face': false,
            coords: [
              {x:  0, y: -.415, z: 0},
              {x: -1, y: -.83, z: 0},
              {x: -1.13, y:  -.71, z: 0},
              {x: -.414, y: 0, z: 0}
            ]
          },
          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 0, y: 0, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },
        ],
        'marking-fold': true,
        'v-fold': true,
        'move-index': [],
        'fold-index': [],
        'lasts-fold': []
      },
      {
        text: '.....',
        shapes: [
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  0, y: -.414, z: 0},
              {x:  0, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  1, y: -.83, z: 0},
              {x:  1, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 1, y: -.83, z: 0},
              {x: 1.13, y:  -.71, z: 0},
              {x: .414, y: 0, z: 0}
            ]
          },
          {
            'z-index': 5,
            'front-face': true,
            coords: [
              {x:  0, y: -.415, z: 0},
              {x: -1, y: -.83, z: 0},
              {x: -1.13, y:  -.71, z: 0},
              {x: -.414, y: 0, z: 0}
            ]
          },
          {
            'z-index': 4,
            'front-face': false,
            coords: [
              {x:  1, y:  0, z: 0},
              {x:  -1, y:  0, z: 0},
              {x:  -1, y:  -.83, z: 0},
            ]
          },
          {
            'z-index': 3,
            'front-face': true,
            coords: [
              {x:  1, y:  0, z: 0},
              {x:  -1, y:  0, z: 0},
              {x:  -1, y:  -.83, z: 0},
            ]
          },
          {
            'z-index': 4,
            'front-face': false,
            coords: [
              {x:  0, y: -.415, z: 0},
              {x: -1, y: -.83, z: 0},
              {x: -1.13, y:  -.71, z: 0},
              {x: -.414, y: 0, z: 0}
            ]
          },
          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 0, y: 0, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },

        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [6, 0], [6, 1], [6, 2], [7, 0]],
        'fold-index': [[1, 0], [1, 2]],
        'lasts-fold': []
      },
      {
        text: '......',
        shapes: [
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  0, y: -.414, z: 0},
              {x:  0, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  0, y: -.414, z: 0},
              {x:  1, y: -.83, z: 0},
              {x:  1, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 1, y: -.83, z: 0},
              {x: 1.13, y:  -.71, z: 0},
              {x: .587, y: -.171, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 1, y:  0, z: 0},
              {x:  0, y: .414, z: 0},
              {x:  0, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x:  1, y:  0, z: 0},
              {x: -1, y: .83, z: 0},
              {x: -1, y:  0, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x:  0, y: .415, z: 0},
              {x: -1, y: .83, z: 0},
              {x: -1.13, y:  .71, z: 0},
              {x: -.414, y: 0, z: 0}
            ]
          },
          {
            'z-index': -2,
            'front-face': false,
            coords: [
              {x:  0, y: -.415, z: 0},
              {x:  1, y: -.83, z: 0},
              {x:  1, y: 0, z: 0},
            ]
          }, {
            'z-index': -3,
            'front-face': true,
            coords: [
              {x:  0, y: -.415, z: 0},
              {x: 1, y: -.83, z: 0},
              {x: 1.13, y:  -.71, z: 0},
              {x: .587, y: -.171, z: 0}
            ]
          }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[1, 2], [2, 1], [2, 2], [6, 1], [7, 1], [7, 2]],
        'fold-index': [[1, 1], [1, 3]],
        'lasts-fold': []
      },
      {
        text: '.......',
        shapes: [
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: 0, y: -0.415, z: 0},
              {x: 0.413, y: 0.587, z: 0},
              {x: 0.590, y: 0.594, z: 0},
              {x: 0.587, y: -0.171, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 0, y: -0.415, z: 0},
              {x: 0.413, y: 0.587, z: 0},
              {x: 1, y: 0, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: -0.414, z: 0},
              {x: 0, y: 0, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: -0.414, z: 0},
              {x: 0.413, y: 0.587, z: 0},
              {x: 1, y: 0, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 0, y: -0.415, z: 0},
              {x: 0.413, y: 0.587, z: 0},
              {x: 0.590, y: 0.594, z: 0},
              {x: 0.587, y: -0.171, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 1, y: 0, z: 0},
              {x: 0, y: 0.414, z: 0},
              {x: 0, y: 0, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: 1, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: -1, y: 0.83, z: 0},
              {x: -1, y: 0, z: 0}
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: 0, y: 0.415, z: 0},
              {x: -1, y: 0.83, z: 0},
              {x: -1.13, y: 0.71, z: 0},
              {x: -0.414, y: 0, z: 0}
            ]
          },
          {
            'z-index': -2,
            'front-face': false,
            coords: [
              {x:  0, y: .415, z: 0},
              {x:  -1, y: .83, z: 0},
              {x:  -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -3,
            'front-face': true,
            coords: [
              {x:  0, y: .415, z: 0},
              {x: -1, y: .83, z: 0},
              {x: -1.13, y: .71, z: 0},
              {x: -.587, y: .171, z: 0}
            ]
          }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[6, 2], [7, 1], [7, 2], [8, 1], [9, 1], [9, 2]],
        'fold-index': [[6, 1], [6, 3]],
        'lasts-fold': []
      },
      {
        text: '........',
        shapes: [
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x:  1, y: 0, z: 0},
              {x: 0, y: .415, z: 0}
            ]
          },
          {
            'z-index': 1,
            'front-face': false,
            coords: [
              {x: -1, y:  0, z: 0},
              {x:  0, y: -.415, z: 0},
              {x:  0, y: 0, z: 0},
            ]
          },
          {
            'z-index': 1,
            'front-face': false,
            coords: [
              {x: 1, y:  0, z: 0},
              {x:  0, y: .415, z: 0},
              {x:  0, y: 0, z: 0},
            ]
          },

          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: -.413, y: -.587, z: 0},
              {x: 0, y: .415, z: 0}
            ]
          },
          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: 1, y: 0, z: 0},
              {x: .413, y: .587, z: 0},
              {x: 0, y: -.415, z: 0}
            ]
          },

          {
            'z-index': 3,
            'front-face': true,
            coords: [
              {x: 0, y: .415, z: 0},
              {x: -.413, y: -.587, z: 0},
              {x: -.590, y: -.594, z: 0},
              {x: -.587, y: .171, z: 0}
            ]
          },
          {
            'z-index': 3,
            'front-face': true,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: .413, y: .587, z: 0},
              {x: .590, y: .594, z: 0},
              {x: .587, y: -.171, z: 0}
            ]
          },


// ----------------------------------------


          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x: 0, y: .415, z: 0},
              {x: -.413, y: -.587, z: 0},
              {x: -.590, y: -.594, z: 0},
              {x: -.587, y: .171, z: 0}
            ]
          },
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: .413, y: .587, z: 0},
              {x: .590, y: .594, z: 0},
              {x: .587, y: -.171, z: 0}
            ]
          },
          {
            'z-index': -2,
            'front-face': true,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: -.413, y: -.587, z: 0},
              {x: 0, y: .415, z: 0}
            ]
          },
          {
            'z-index': -2,
            'front-face': true,
            coords: [
              {x: 1, y: 0, z: 0},
              {x: .413, y: .587, z: 0},
              {x: 0, y: -.415, z: 0}
            ]
          },

          {
            'z-index': -3,
            'front-face': false,
            coords: [
              {x: 1, y: 0, z: 0},
              {x: 0, y: 0, z: 0},
              {x: -.415, y: 0, z: 0},
              {x: 0, y: .415, z: 0}
            ]
          },
          {
            'z-index': -3,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: 0, z: 0},
              {x: .415, y: 0, z: 0},
              {x: 0, y: -.415, z: 0}
            ]
          },

          {
            'z-index': -4,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: -.415, y: 0, z: 0},
              {x: -.587, y: .172, z: 0}
            ]
          },
          {
            'z-index': -4,
            'front-face': false,
            coords: [
              {x: 1, y: 0, z: 0},
              {x: .415, y: 0, z: 0},
              {x: .587, y: -.172, z: 0}
            ]
          },
        ],
        rotation: true,

        'marking-fold': false,
        'v-fold': true,
        'move-index': [],
        'fold-index': [],
        'lasts-fold': []
      },
      {
        text: '.........',
        shapes: [,
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -.415, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x: -.587, y: -.172, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: .415, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: .587, y: .172, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: 1, y: 0, z: 0},
              {x: -1, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },
          {
            'z-index': 1,
            'front-face': true,
            coords: [
              {x: .292, y: -.294, z: 0},
              {x: .413, y: -.587, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },
          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: .413, y: -.587, z: 0},
              {x: .590, y: -.594, z: 0},
              {x: .589, y: -.411, z: 0},
            ]
          },
          {
            'z-index': 1,
            'front-face': true,
            coords: [
              {x: -.292, y: .294, z: 0},
              {x: -.413, y: .587, z: 0},
              {x: -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: -.413, y: .587, z: 0},
              {x: -.590, y: .594, z: 0},
              {x: -.589, y: .411, z: 0},
            ]
          }
          ,
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x: .292, y: -.294, z: 0},
              {x: .413, y: -.587, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -2,
            'front-face': true,
            coords: [
              {x: .413, y: -.587, z: 0},
              {x: .590, y: -.594, z: 0},
              {x: .589, y: -.411, z: 0},
              {x: .588, y: -.171, z: 0},
              {x: .292, y: -.294, z: 0},
            ]
          },/*
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x: -.292, y: .294, z: 0},
              {x: -.413, y: .587, z: 0},
              {x: -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -2,
            'front-face': true,
            coords: [
              {x: -.413, y: .587, z: 0},
              {x: -.590, y: .594, z: 0},
              {x: -.589, y: .411, z: 0},
              {x: -.588, y: .171, z: 0},
              {x: -.292, y: .294, z: 0},
            ]
          }*/
        ],


        'marking-fold': false,
        'v-fold': true,
        'move-index': [[4, 1], [5, 0], [5, 1], [5, 2], [8, 1], [9, 0], [9, 1], [9, 2]],
        'fold-index': [[4, 0], [4, 2]],
        'lasts-fold': []
      },
      {
        text: '..........',
        shapes: [
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              { x: .169, y: 0, z: 0 },​​​​
              { x: .289, y: .128, z: 0 },​​​​
              { x: .418, y: 0, z: 0 },​​​​
              { x: .588, y: -.171, z: 0 },​​​​
              { x: .292, y: -.294, z: 0 }
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              ​​​​{ x: 0.292, y: -0.294, z: 0 },
​​​​              { x: 0.169, y: 0, z: 0 },
              { x: 1, y: 0, z: 0}
            ]
          ​​​​},
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -.415, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x: -.587, y: -.172, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: .415, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: .587, y: .172, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: 1, y: 0, z: 0},
              {x: -1, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },
          {
            'z-index': 1,
            'front-face': true,
            coords: [
              {x: -.292, y: .294, z: 0},
              {x: -.413, y: .587, z: 0},
              {x: -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': 2,
            'front-face': false,
            coords: [
              {x: -.413, y: .587, z: 0},
              {x: -.590, y: .594, z: 0},
              {x: -.589, y: .411, z: 0},
            ]
          },
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x: -.292, y: .294, z: 0},
              {x: -.413, y: .587, z: 0},
              {x: -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -2,
            'front-face': true,
            coords: [
              {x: -.413, y: .587, z: 0},
              {x: -.590, y: .594, z: 0},
              {x: -.589, y: .411, z: 0},
              {x: -.588, y: .171, z: 0},
              {x: -.292, y: .294, z: 0},
            ]
          }
        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[5, 1], [6, 0], [6, 1], [6, 2], [7, 1], [8, 0], [8, 1], [8, 2]],
        'fold-index': [[5, 0], [5, 2]],
        'lasts-fold': []
      },
      {
        text: '...........',
        shapes: [
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              { x: .169, y: 0, z: 0 },​​​​
              { x: .289, y: .128, z: 0 },​​​​
              { x: .418, y: 0, z: 0 },​​​​
              { x: .588, y: -.171, z: 0 },​​​​
              { x: .292, y: -.294, z: 0 }
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              { x: -.169, y: 0, z: 0 },​​​​
              { x: -.289, y: -.128, z: 0 },​​​​
              { x: -.418, y: 0, z: 0 },​​​​
              { x: -.588, y: .171, z: 0 },​​​​
              { x: -.292, y: .294, z: 0 }
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: -.415, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x: -.587, y: -.172, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': true,
            coords: [
              {x: .415, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: .587, y: .172, z: 0},
            ]
          },
          {
            'z-index': 0,
            'front-face': false,
            coords: [
              {x: -1, y: 0, z: 0},
              {x: 0, y: .415, z: 0},
              {x: 1, y: 0, z: 0},
              {x: -1, y: 0, z: 0},
              {x: 0, y: -.415, z: 0},
              {x: 1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -1,
            'front-face': true,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: 0, y: 0, z: 0},
              {x: -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -1,
            'front-face': false,
            coords: [
              {x: 0, y: .415, z: 0},
              {x: 0, y: 0, z: 0},
              {x: -1, y: 0, z: 0},
            ]
          },
          {
            'z-index': -2,
            'front-face': true,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: -.292, y: .293, z: 0},
              {x: -.588, y: .171, z: 0},
              {x: -.587, y: -.171, z: 0},
            ]
          },
          {
            'z-index': -2,
            'front-face': false,
            coords: [
              {x: 0, y: -.415, z: 0},
              {x: -.292, y: .293, z: 0},
              {x: -1, y: 0, z: 0}
            ]
          }

        ],
        'marking-fold': false,
        'v-fold': true,
        'move-index': [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0], [2, 2], [4, 0], [4, 3],
        [5, 2], [6, 2], [7, 1], [7, 2], [7, 3], [8, 1], [8, 2]],
        'fold-index': [[4, 1], [4, 4]],
        'lasts-fold': []
      },
    ];
  }
}
