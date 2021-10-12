import { Track } from './track.model';
export class Album {
  name!: string;
  artist!: string;
  image!: string;
  tracks!: Array<Track>;
  summary!: string;
  tags!: Array<string>;
  isInFavourites!: boolean;
  id: string;
  date: number;
}
