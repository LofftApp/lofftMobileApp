export interface District {
  id: number;
  name: string;
  toggle: boolean;
  emoji?: string;  // optional, since not all districts have emojis
}

export interface City {
  districts: District[];
  flag: string;
}

export interface Data {
  berlin: City;
  paris: City;
  budapest: City;
  brussels: City;
  brisbane: City;
  wroclaw: City;
  warszawa: City;
}
