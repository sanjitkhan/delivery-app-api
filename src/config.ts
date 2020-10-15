import { SchemaOptions } from "@nestjs/mongoose";

const PORT = 3000;

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false, // deletes __v
  toJSON: {
    virtuals: true, // adds id
    transform: (doc: any, ret: any) => {
      delete ret._id;
      // delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
  toObject: {
    virtuals: true, // adds id
  },
};

export const config = {
  mongodbUrl: 'mongodb://localhost:27017/Appdb',
  port: PORT,
  swaggerSchemaName: 'swagger',
  swaggerServerUrl: 'http://localhost:' + PORT + '/api-json'
};