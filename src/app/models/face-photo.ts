import { Person } from './person';
import { RecognizedFace } from './recognized-face';

export class FacePhoto {
  faces: RecognizedFace[];
  persons: Person[];
  photo: Buffer;
}
