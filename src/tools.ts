import { AsyncModelFactory, SchemaFactory } from "@nestjs/mongoose";
import { Schema, Types } from "mongoose";
import { ID, ObjectId } from "./interfaces";

export class MongoTools {
  public static Compare(a: ID, b: ID): boolean {
    return String(a) === String(b);
  }

  public static FindCompare<T extends ID>(
    list: Array<T>,
    value: any
  ): T | undefined {
    return list.find((v) => MongoTools.Compare(v, value));
  }

  public static FindFieldCompare<T>(
    list: Array<T>,
    field: keyof T,
    value: any
  ): T | undefined {
    return list.find((v) => MongoTools.Compare(String(v[field]), value));
  }

  public static ToObjectId(value: ID): ObjectId {
    if (!value || !String(value).length) return "" as unknown as ObjectId;
    return Types.ObjectId(String(value));
  }

  public static CreateSchema(
    schemaClass: any,
    setVersionKey: boolean = false,
    setTimestamps: boolean = false
  ): Schema {
    const schema = SchemaFactory.createForClass(schemaClass)
      .set("versionKey", setVersionKey)
      .set("timestamps", setTimestamps);
    return schema;
  }

  public static CreateSchemaFactory(
    name: string,
    schema: any
  ): AsyncModelFactory {
    return {
      name: name,
      useFactory: () => schema,
    };
  }
}
