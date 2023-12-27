import "typeahead.js";
import { MappedResponse } from "./mapper/defaultmapper";
import TypeaheadSourceOptions from "./TypeaheadSourceOptions";

class Typeahead {
    constructor(private $input: JQuery<HTMLInputElement>, private callback: (suggestion: MappedResponse) => void, private sourceOptions: TypeaheadSourceOptions) {
        this.init();
    }

    init() {
        const { appendQuery, mapper, name, ajaxSource } = this.sourceOptions;
        this.$input.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: name,
            source: (query, syncResults, asyncResults) => {
                const request: JQuery.AjaxSettings<any> = {
                    url: ajaxSource + (appendQuery ? query : ""),
                    dataType: "json",
                    success: (data) => {
                        asyncResults(mapper(data).filter((item: MappedResponse) => { return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1; }));
                    }
                };
                if(this.sourceOptions.data) request.data = this.sourceOptions.data;
                if(this.sourceOptions.dataBuilder) request.data = this.sourceOptions.dataBuilder();
                $.ajax(request);
            },
            display: 'name',
            limit: 10,
            templates: {
                suggestion: (item: {name:String, id:number}) => {
                    return `<div>${item.name}</div>`;
                },
                pending: () => {
                    return `<div>Loading...</div>`;
                },
                notFound: () => {
                    return `<div>No results found</div>`;
                }
            },
        });

        this.$input.on('typeahead:select', (ev: any, suggestion: MappedResponse) => {
            this.callback(suggestion);
        });
    }
}

export default Typeahead;