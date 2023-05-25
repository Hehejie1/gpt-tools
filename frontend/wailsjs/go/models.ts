export namespace gpt {
	
	export class ContentType {
	    role: string;
	    content: string;
	
	    static createFrom(source: any = {}) {
	        return new ContentType(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.role = source["role"];
	        this.content = source["content"];
	    }
	}

}

