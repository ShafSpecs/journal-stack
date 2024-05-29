/* eslint-disable import/no-unresolved */
import fs from 'fs/promises'
import path from 'path'
import toml from '@iarna/toml'
import sort from 'sort-package-json'

const escapeRegExp = string =>
  // $& means the whole matched string
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default async function main({ rootDirectory }) {
  const FLY_TOML_PATH = path.join(rootDirectory, 'fly.toml')
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, '.env.example')
  const ENV_PATH = path.join(rootDirectory, '.env')
  const PACKAGE_JSON_PATH = path.join(rootDirectory, 'package.json')

  const REPLACER = escapeRegExp('journal-stack')

  const DIR_NAME = path.basename(rootDirectory)

  const APP_NAME = DIR_NAME

  const [prodContent, env, packageJson] = await Promise.all([
    fs.readFile(FLY_TOML_PATH, 'utf-8'),
    fs.readFile(EXAMPLE_ENV_PATH, 'utf-8'),
    fs.readFile(PACKAGE_JSON_PATH, 'utf-8'),
  ])

  const prodToml = toml.parse(prodContent)
  prodToml.app = prodToml.app.replace(new RegExp(REPLACER, 'g'), APP_NAME)

  const newPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJson), name: APP_NAME }),
      null,
      2
    ) + '\n'

  await Promise.all([
    fs.writeFile(FLY_TOML_PATH, toml.stringify(prodToml)),
    fs.writeFile(ENV_PATH, env),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    fs.copyFile(
      path.join(rootDirectory, 'remix.init', 'gitignore'),
      path.join(rootDirectory, '.gitignore')
    ),
    fs.rm(path.join(rootDirectory, '.github', 'funding.yml')),
    fs.rm(path.join(rootDirectory, 'docs'), { recursive: true }),
    fs.rm(path.join(rootDirectory, 'LICENSE.md')),
  ])
}
