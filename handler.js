"use strict";

const { KintoneRestAPIClient } = require("@kintone/rest-api-client");

// (実際は、環境変数等を使うべき)
const SUBDOMAIN = "fpg0fs9qefdj";
const APP_ID = "1";
const API_TOKEN = "GNfYJFinxuVYEZUuMkDWUdYlGaMdBrINNl7HVzIY";

const client = new KintoneRestAPIClient({
  baseUrl: `https://${SUBDOMAIN}.cybozu.com`,
  auth: {
    apiToken: API_TOKEN,
  },
});

const createResponse = (statusCode, data) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(data, null, 2),
  };
};

const handler = async (func) => {
  try {
    const data = await func();
    return createResponse(200, data);
  } catch (error) {
    console.log("createResponse error");
    console.log(error);
    return createResponse(500, { error: error.message });
  }
};

module.exports.getAllRecords = async () => {
  // 全レコードを取得
  return handler(async () => {
    const records = await client.record.getAllRecords({
      app: APP_ID,
    });
    return { records };
  });
};

module.exports.getRecord = async (event) => {
  // 指定したレコードIDの一件を取得
  return handler(async () => {
    const recordId = event.queryStringParameters.id;
    const record = await client.record.getRecord({
      app: APP_ID,
      id: recordId,
    });
    return { record };
  });
};

module.exports.addRecord = async (event) => {
  // データ登録
  return handler(async () => {
    const body = event.body;
    const data = JSON.parse(body);

    const record = {
      name: { value: data.name },
      latitude: { value: data.latitude },
      longitude: { value: data.longitude },
    };

    return await client.record.addRecord({
      app: APP_ID,
      record,
    });
  });
};

module.exports.updateRecord = async (event) => {
  // id, revision のデータを更新
  return handler(async () => {
    const body = event.body;
    const data = JSON.parse(body);

    const recordId = data.id;
    const revision = data.revision;
    const record = {
      name: { value: data.name },
      latitude: { value: data.latitude },
      longitude: { value: data.longitude },
    };

    return await client.record.updateRecord({
      app: APP_ID,
      id: recordId,
      revision,
      record,
    });
  });
};

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
