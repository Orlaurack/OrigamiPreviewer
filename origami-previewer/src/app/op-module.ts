import { Coordinate } from 'src/app/op-coordinate';

export class OrigamiModule {
  ap: Coordinate;
  an: Coordinate;
  ac: Coordinate;
  bp: Coordinate;
  bn: Coordinate;
  cp: Coordinate;
  cn: Coordinate;
  dp: Coordinate;
  dn: Coordinate;
  ep: Coordinate;
  en: Coordinate;
  fp: Coordinate;
  fn: Coordinate;
  gp: Coordinate;
  gn: Coordinate;
  hp: Coordinate;
  hn: Coordinate;
  ip: Coordinate;
  in: Coordinate;
  jp: Coordinate;
  jn: Coordinate;
  kp: Coordinate;
  kn: Coordinate;

  vertexDistance = 100;

  constructor(leftPrimary?: Coordinate,
              rightPrimary?: Coordinate,
              leftSecond?: Coordinate,
              rightSecond?: Coordinate)
  {
    const leftVertex: Coordinate = this.calculVertex(leftPrimary, rightPrimary, leftSecond);
    const rightVertex: Coordinate =  this.calculVertex(rightPrimary, leftPrimary, rightSecond);
    const moyenne = (coordinates: Coordinate[]) => {
      let x = 0;
      let y = 0;
      let z = 0;
      for (const coordinate of coordinates)
      {
        x += coordinate.x;
        y += coordinate.y;
        z += coordinate.z;
      }
      return new Coordinate(x / coordinates.length, y / coordinates.length, z / coordinates.length);
    };

    this.ap = rightPrimary;
    this.an = leftPrimary;
    this.ac = moyenne([rightPrimary, leftPrimary]);
    this.bp = moyenne([moyenne([rightPrimary, leftPrimary]), moyenne([rightPrimary, leftPrimary, leftVertex])]);
    this.bn = moyenne([moyenne([rightPrimary, leftPrimary]), moyenne([rightPrimary, leftPrimary, rightVertex])]);
    this.cp = moyenne([rightPrimary, leftPrimary, leftVertex]);
    this.cn = moyenne([rightPrimary, leftPrimary, rightVertex]);
    this.dp = moyenne([leftPrimary, leftVertex]);
    this.dn = moyenne([rightPrimary, rightVertex]);
    this.ep = moyenne([moyenne([leftPrimary, leftSecond, leftVertex]), moyenne([leftPrimary, leftSecond])]);
    this.en = moyenne([moyenne([rightPrimary, rightSecond, rightVertex]), moyenne([rightPrimary, rightSecond])]);
    this.fp = moyenne([leftPrimary, leftSecond, leftVertex]);
    this.fn = moyenne([rightPrimary, rightSecond, rightVertex]);
    this.gp = moyenne([moyenne([leftPrimary, leftVertex]), moyenne([leftSecond, leftVertex])]);
    this.gn = moyenne([moyenne([rightPrimary, rightVertex]), moyenne([rightSecond, rightVertex])]);
    this.hp = moyenne([leftSecond, leftVertex]);
    this.hn = moyenne([rightSecond, rightVertex]);
    this.ip = leftVertex;
    this.in = rightVertex;
    this.jp = moyenne([leftSecond, rightPrimary, leftVertex, leftVertex]);
    this.jn = moyenne([rightSecond, leftPrimary, rightVertex, rightVertex]);
    this.kp = moyenne([rightPrimary, leftVertex, leftSecond]);
    this.kn = moyenne([leftPrimary, rightVertex, rightSecond]);
  }
  calculVertex(A: Coordinate, B: Coordinate, C: Coordinate){
    const length = 0.35 + (this.vertexDistance / 200);
    return new Coordinate(((A.x + B.x + C.x) * length), ((A.y + B.y + C.y) * length), ((A.z + B.z + C.z) * length));
  }
}
