const core = require("@actions/core");
const execa = require("execa");

let args = ["./node_modules/.bin/depcheck"];

const config = core.getInput("config");
if (config !== "") {
  core.info(`Using config file: ${config}`);
  args.push(`--config=${config}`);
}

const workdir = core.getInput("workdir") || ".";
core.info(`Using workdir: ${workdir}`);
args.push(workdir);

(async () => {
  core.info(`Running: ${args.join(" ")}`);
  try {
    const { stdout } = await execa("node", args);
    core.info(stdout);
  } catch (err) {
    core.setFailed(err.stdout);
  }
})();
