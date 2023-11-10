import { NavProps } from "./crudInterface";

export interface NavPropsList {
    topics: NavProps[];
    onChangeMode: (_id: number, _mode: string) => void;
}
