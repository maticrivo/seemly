module.exports = {
  description: 'Add a new widget',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Title',
    validate: (value) => {
      if (!(/.+/).test(value)) {
        return 'The name is required';
      }

      return true;
    },
  }],
  actions: () => {
    const widgetTemplate = './widget/_template.hbs';

    const actions = [{
      type: 'add',
      path: '../../widgets/{{dashCase name}}.js',
      templateFile: widgetTemplate,
      abortOnFail: true,
    }];

    return actions;
  },
};
