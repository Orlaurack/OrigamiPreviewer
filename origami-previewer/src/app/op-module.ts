import { Coordinate } from 'src/app/op-coordinate';
import { SolidSettingsService } from './op-solid-settings.service';

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

  picsHeight: number;

  constructor(
    picsHeight: number,
    leftPrimary?: Coordinate,
    rightPrimary?: Coordinate,
    leftSecond?: Coordinate,
    rightSecond?: Coordinate) {
    this.picsHeight = picsHeight;
    const leftVertex: Coordinate = this.calculVertex(leftPrimary, rightPrimary, leftSecond);
    const rightVertex: Coordinate =  this.calculVertex(rightPrimary, leftPrimary, rightSecond);
    const moyenne = (coordinates: Coordinate[]) => {
      let x = 0;
      let y = 0;
      let z = 0;
      for (const coordinate of coordinates) {
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
  calculVertex(A: Coordinate, B: Coordinate, C: Coordinate) {
    const length = 1 + (this.picsHeight / 80);
    const center = {x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3, z: (A.z + B.z + C.z) / 3};


    /*
    A B C -> D = {x:(A.x+B.x+C.x)/3, y:(A.y+B.y+C.y)/3, z:(A.z+B.z+C.z)/3}

    p = {a, b, c, d}:

    AB = (b.x-a.x, b.y-a.y, b.z-a.z)
    AC = (c.x-a.x, c.y-a.y, c.z-a.z)

    L1 = {a: AB.x, b: AB.y, c: AB.z}
    L2 = {a: AC.x, C: AC.y, c: AC.z}

    rA = L1.a / L2.a
    rB = L1.b / L2.b

    n = {a: (L1.c-(rB*L2.c)) / (-(L1.a-(rB*L2.a))), b: (L1.c-(rA*L2.c)) / (-(L1.b-(rA*L2.b))), c: 1, d:0};

    n.d = (n.a*D.x)+(n.b*D.y)+(n.c*D.z);
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 plan de ABC

    suite au prochain épisode
    */


    return new Coordinate(center.x * length, center.y * length, center.z * length);
  }
}
