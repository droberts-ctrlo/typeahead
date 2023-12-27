import { MapperFunction } from "./mapper/defaultmapper";

class TypeaheadSourceOptions {
    constructor(
        public name: string,
        public ajaxSource: string,
        public mapper: MapperFunction,
        public appendQuery: boolean,
        public data: any,
        public dataBuilder?: Function
    ) {}
}

export default TypeaheadSourceOptions;