"use strict";
const Generator = require("yeoman-generator");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // This makes `modelname` a required argument.
    this.argument("modelname", { type: String, required: true });
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Scaffold ${this.options.modelname}`));

    const choices = ["string", "integer", "date", "boolean", "float"];

    const prompts = [
      {
        type: "input",
        name: "fieldName",
        message: "Select your field name",
        default: "field"
      },
      {
        type: "list",
        name: "fieldType",
        message: "Select your field type",
        default: "string",
        choices: choices
      },
      {
        type: "confirm",
        name: "allowNull",
        message: "allow null ?",
        default: "Y"
      },
      {
        type: "confirm",
        name: "repeat",
        message: "another field",
        default: "Y"
      }
    ];

    this.columns = [];

    const loop = relevantPrompts => {
      return this.prompt(relevantPrompts).then(props => {
        this.columns.push(props);

        return props.repeat ? loop(prompts) : this.prompt([]);
      });
    };

    return loop([...prompts]);
  }

  writing() {
    let controllerName = `${this.options.modelname}Controller`;
    let serviceName = `${this.options.modelname}Service`;
    let routerName = `${this.options.modelname}Routes`;

    this.fs.copyTpl(
      this.templatePath("model.js"),
      this.destinationPath(`src/models/${this.options.modelname}.js`),
      {
        modelname: this.options.modelname,
        fields: this.columns
      }
    );

    this.fs.copyTpl(
      this.templatePath("controller.js"),
      this.destinationPath(
        `src/controllers/${this.options.modelname}Controller.js`
      ),
      {
        modelname: this.options.modelname,
        fields: this.columns,
        fieldsRequiered: this.columns.filter(f => !f.allowNull),
        controllername: controllerName,
        servicename: serviceName,
        routername: routerName
      }
    );

    this.fs.copyTpl(
      this.templatePath("service.js"),
      this.destinationPath(`src/services/${this.options.modelname}Service.js`),
      {
        modelname: this.options.modelname,
        fields: this.columns,
        controllername: controllerName,
        servicename: serviceName,
        routername: routerName
      }
    );

    this.fs.copyTpl(
      this.templatePath("routes.js"),
      this.destinationPath(`src/routes/${this.options.modelname}Routes.js`),
      {
        modelname: this.options.modelname,
        fields: this.columns,
        controllername: controllerName,
        servicename: serviceName,
        routername: routerName
      }
    );

    this.fs.copyTpl(
      this.templatePath("migration.js"),
      this.destinationPath(
        `src/db/migrations/${Date.now()}-create-${this.options.modelname.toLowerCase()}.js`
      ),
      {
        modelname: this.options.modelname,
        fields: this.columns,
        controllername: controllerName,
        servicename: serviceName,
        routername: routerName
      }
    );
  }

  install() {}
};
