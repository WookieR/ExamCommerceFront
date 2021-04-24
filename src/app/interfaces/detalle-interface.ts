// To parse this data:
//
//   import { Convert, DetallesResponse } from "./file";
//
//   const detallesResponse = Convert.toDetallesResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface DetallesResponse {
    ok:       boolean;
    factura:  Factura;
    detalles: Detalle[];
}

export interface Detalle {
    _id:            string;
    producto:       string;
    nombreProducto: string;
    precioUnitario: number;
    cantidad:       number;
    subtotal:       number;
    factura:        string;
    __v:            number;
}

export interface Factura {
    _id:           string;
    numeroFactura: string;
    cliente:       Cliente;
    empleado:      Cliente;
    total:         number;
    __v:           number;
    fecha:           Date;
}

export interface Cliente {
    _id:             string;
    tarjetaCredito?: string;
    nombre:          string;
    apellido:        string;
    dni:             string;
    edad:            number;
    __v:             number;
    legajo?:         string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDetallesResponse(json: string): DetallesResponse {
        return cast(JSON.parse(json), r("DetallesResponse"));
    }

    public static detallesResponseToJson(value: DetallesResponse): string {
        return JSON.stringify(uncast(value, r("DetallesResponse")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "DetallesResponse": o([
        { json: "ok", js: "ok", typ: true },
        { json: "factura", js: "factura", typ: r("Factura") },
        { json: "detalles", js: "detalles", typ: a(r("Detalle")) },
    ], false),
    "Detalle": o([
        { json: "_id", js: "_id", typ: "" },
        { json: "producto", js: "producto", typ: "" },
        { json: "nombreProducto", js: "nombreProducto", typ: "" },
        { json: "precioUnitario", js: "precioUnitario", typ: 0 },
        { json: "cantidad", js: "cantidad", typ: 0 },
        { json: "subtotal", js: "subtotal", typ: 0 },
        { json: "factura", js: "factura", typ: "" },
        { json: "__v", js: "__v", typ: 0 },
    ], false),
    "Factura": o([
        { json: "_id", js: "_id", typ: "" },
        { json: "numeroFactura", js: "numeroFactura", typ: "" },
        { json: "cliente", js: "cliente", typ: r("Cliente") },
        { json: "empleado", js: "empleado", typ: r("Cliente") },
        { json: "total", js: "total", typ: 0 },
        { json: "__v", js: "__v", typ: 0 },
    ], false),
    "Cliente": o([
        { json: "_id", js: "_id", typ: "" },
        { json: "tarjetaCredito", js: "tarjetaCredito", typ: u(undefined, "") },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "apellido", js: "apellido", typ: "" },
        { json: "dni", js: "dni", typ: "" },
        { json: "edad", js: "edad", typ: 0 },
        { json: "__v", js: "__v", typ: 0 },
        { json: "legajo", js: "legajo", typ: u(undefined, "") },
    ], false),
};
