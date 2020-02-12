"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // This makes `modelname` a required argument.
    this.argument("projectName", { type: String, required: true });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the glorious ${chalk.red(
          "generator-simple-node"
        )} generator!`
      )
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(""),
      this.destinationPath(this.options.projectName),
      null,
      null,
      { globOptions: { dot: true } }
    );
  }

  install() {
    // this.installDependencies();
  }
};
