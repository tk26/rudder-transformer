const { setLambdaUserTransform, runLambdaUserTransform } = require('./customTransformer-lambda');

const { setOpenFaasUserTransform, runOpenFaasUserTransform } = require('./customTransformer-faas');

const { userTransformHandlerV1, setUserTransformHandlerV1 } = require('./customTransformer-v1');

const UserTransformHandlerFactory = (userTransformation) => {
  const transformHandler = {
    setUserTransform: async (testWithPublish) => {
      switch (userTransformation.language) {
        case 'pythonfaas':
          return setOpenFaasUserTransform(userTransformation, testWithPublish);
        case 'python':
          return setLambdaUserTransform(userTransformation, testWithPublish);
        default:
          return setUserTransformHandlerV1();
      }
    },

    runUserTransfrom: async (events, testMode, libraryVersionIDs) => {
      switch (userTransformation.language) {
        case 'pythonfaas':
          return runOpenFaasUserTransform(events, userTransformation, testMode);
        case 'python':
          return runLambdaUserTransform(events, userTransformation, testMode);
        default:
          return userTransformHandlerV1(events, userTransformation, libraryVersionIDs, testMode);
      }
    },
  };
  return transformHandler;
};

exports.UserTransformHandlerFactory = UserTransformHandlerFactory;
