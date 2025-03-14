
const authDoc = require('./swagger.auth.json');
const profileDoc = require('./swagger.profile.json');
const nutritionPlan = require('./swagger.nutritionPlan.json')
const combinedDoc = {
  ...authDoc,
  paths: {
    ...authDoc.paths,
    ...profileDoc.paths,
    ...nutritionPlan.paths
  },
  components: {
    ...authDoc.components,
    ...profileDoc.components,
    ...nutritionPlan.components
  }
};
module.exports = combinedDoc;