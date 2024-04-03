# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/compwright/passport-saml-metadata/compare/v3.2.0...v4.0.0) (2024-04-03)


### ⚠ BREAKING CHANGES

* upgrade @node-saml/node-saml to v5 (#47)

* upgrade @node-saml/node-saml to v5 ([#47](https://github.com/compwright/passport-saml-metadata/issues/47)) ([e185a0e](https://github.com/compwright/passport-saml-metadata/commit/e185a0efd45d0c94dc2e2727b123dd4da3e7d3fb))

## [3.2.0](https://github.com/compwright/passport-saml-metadata/compare/v3.1.2...v3.2.0) (2023-10-13)


### Features

* make MetadataReader.query() public ([#45](https://github.com/compwright/passport-saml-metadata/issues/45)) ([3996537](https://github.com/compwright/passport-saml-metadata/commit/399653721432e2eaa29de6dfc125b653b5ee67e5))

### [3.1.2](https://github.com/compwright/passport-saml-metadata/compare/v3.1.1...v3.1.2) (2023-03-02)


### Bug Fixes

* add missing file extensions to lodash imports ([#43](https://github.com/compwright/passport-saml-metadata/issues/43)) ([cfce891](https://github.com/compwright/passport-saml-metadata/commit/cfce891f10804980cd7fd21cee10983439caba59)), closes [#42](https://github.com/compwright/passport-saml-metadata/issues/42)
* **test:** fix test failure ([1f3c001](https://github.com/compwright/passport-saml-metadata/commit/1f3c0012b9ee69016a91b3d4af823a3ae3e09103))

### [3.1.1](https://github.com/compwright/passport-saml-metadata/compare/v3.1.0...v3.1.1) (2022-12-29)


### Bug Fixes

* add check for undefined cert ([#38](https://github.com/compwright/passport-saml-metadata/issues/38)) ([2903836](https://github.com/compwright/passport-saml-metadata/commit/2903836742acfad8c4b29472a6e8cd167cafd117))
* update insecure dependencies ([7876852](https://github.com/compwright/passport-saml-metadata/commit/7876852b1e3ff100687ebb1d1a22d8c5ff94d537))

## [3.1.0](https://github.com/compwright/passport-saml-metadata/compare/v3.0.0...v3.1.0) (2022-12-22)


### Features

* add new entityId() method to MetadataReader ([#41](https://github.com/compwright/passport-saml-metadata/issues/41)) ([707f5e4](https://github.com/compwright/passport-saml-metadata/commit/707f5e48eb439bf3a8d0afe039a1c554ce3241c0)), closes [#40](https://github.com/compwright/passport-saml-metadata/issues/40)


### Bug Fixes

* upgrade dependencies ([d0f21a0](https://github.com/compwright/passport-saml-metadata/commit/d0f21a024864bb949e2f1711f16486fec1d2b172))

## [3.0.0](https://github.com/compwright/passport-saml-metadata/compare/v2.6.2...v3.0.0) (2022-12-14)


### ⚠ BREAKING CHANGES

* Convert to es6 module
* Drop support for Node.js v14

### Features

* add typescript type definitions ([2233a92](https://github.com/compwright/passport-saml-metadata/commit/2233a922c59775156e3689a9d20fa979afbc56f9))
* Convert to es6 module ([fccec16](https://github.com/compwright/passport-saml-metadata/commit/fccec16655292b6e2997a76df2ae9f577913eace))
* Drop support for Node.js v14 ([7a3e142](https://github.com/compwright/passport-saml-metadata/commit/7a3e142ea889ba0e5041ffa374aa0cab1d3b0f70))


### Bug Fixes

* replace deprecated passport-saml with @node-saml/node-saml ([4298588](https://github.com/compwright/passport-saml-metadata/commit/429858851fd52180697ba66e0e09f0c4c1a62fbe)), closes [#39](https://github.com/compwright/passport-saml-metadata/issues/39)

### [2.6.2](https://github.com/compwright/passport-saml-metadata/compare/v2.6.1...v2.6.2) (2022-10-17)

### [2.6.1](https://github.com/compwright/passport-saml-metadata/compare/v2.6.0...v2.6.1) (2022-10-17)

### [2.6.0](https://github.com/compwright/passport-saml-metadata/compare/v2.5.0...v2.6.0) (2022-05-24)

**Merged pull requests:**

- update dependencies and fix vulnerabilities [\#34](https://github.com/compwright/passport-saml-metadata/pull/34) ([rafaelmaeuer](https://github.com/rafaelmaeuer))

### [2.5.0](https://github.com/compwright/passport-saml-metadata/tree/v2.5.0) (2021-09-13)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.4.1...v2.5.0)

**Closed issues:**

- Update passport-saml to v3.1.0 fixes CVE-2021-39171 [\#33](https://github.com/compwright/passport-saml-metadata/issues/33)
- Dependency to xmldom lib version which has security issues [\#32](https://github.com/compwright/passport-saml-metadata/issues/32)

### [2.4.1](https://github.com/compwright/passport-saml-metadata/tree/v2.4.1) (2021-03-10)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.4.0...v2.4.1)

### [2.4.0](https://github.com/compwright/passport-saml-metadata/tree/v2.4.0) (2020-12-16)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.3.0...v2.4.0)

**Closed issues:**

- security alert for xml-crypto which has been updated in passport-saml 1.5.0 [\#31](https://github.com/compwright/passport-saml-metadata/issues/31)

### [2.3.0](https://github.com/compwright/passport-saml-metadata/tree/v2.3.0) (2020-06-01)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.2.0...v2.3.0)

**Merged pull requests:**

- Removed white spaces, new lines from cert key [\#30](https://github.com/compwright/passport-saml-metadata/pull/30) ([GarryOne](https://github.com/GarryOne))
- Update mocha to the latest version 🚀 [\#28](https://github.com/compwright/passport-saml-metadata/pull/28) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

### [2.2.0](https://github.com/compwright/passport-saml-metadata/tree/v2.2.0) (2019-12-23)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.1.0...v2.2.0)

**Closed issues:**

- pem\_read\_bio\_pubkey failed, started sometime after 1.4 series [\#18](https://github.com/compwright/passport-saml-metadata/issues/18)

**Merged pull requests:**

- Update nyc to the latest version 🚀 [\#27](https://github.com/compwright/passport-saml-metadata/pull/27) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update xmldom to the latest version 🚀 [\#26](https://github.com/compwright/passport-saml-metadata/pull/26) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update semistandard to the latest version 🚀 [\#24](https://github.com/compwright/passport-saml-metadata/pull/24) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Make fetch\(\) configurable [\#23](https://github.com/compwright/passport-saml-metadata/pull/23) ([compwright](https://github.com/compwright))

### [2.1.0](https://github.com/compwright/passport-saml-metadata/tree/v2.1.0) (2019-08-17)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.0.1...v2.1.0)

**Closed issues:**

- Adding option for adding a CA [\#17](https://github.com/compwright/passport-saml-metadata/issues/17)
- fetch dosn't support self signed certificate [\#16](https://github.com/compwright/passport-saml-metadata/issues/16)
- reader.claimSchema dosn't find any claims in my metadata.xml [\#15](https://github.com/compwright/passport-saml-metadata/issues/15)

### [2.0.1](https://github.com/compwright/passport-saml-metadata/tree/v2.0.1) (2019-08-17)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v2.0.0...v2.0.1)

### [2.0.0](https://github.com/compwright/passport-saml-metadata/tree/v2.0.0) (2019-08-17)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.6.0...v2.0.0)

**Closed issues:**

- An in-range update of core-js is breaking the build 🚨 [\#14](https://github.com/compwright/passport-saml-metadata/issues/14)

**Merged pull requests:**

- Update superagent to the latest version 🚀 [\#21](https://github.com/compwright/passport-saml-metadata/pull/21) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update mocha to the latest version 🚀 [\#19](https://github.com/compwright/passport-saml-metadata/pull/19) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

### [1.6.0](https://github.com/compwright/passport-saml-metadata/tree/v1.6.0) (2019-01-20)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.5.2...v1.6.0)

**Merged pull requests:**

- Greenkeeper/core js 2.6.2 [\#13](https://github.com/compwright/passport-saml-metadata/pull/13) ([compwright](https://github.com/compwright))
- Handle KeyDescriptor without a use attribute [\#12](https://github.com/compwright/passport-saml-metadata/pull/12) ([esvinson](https://github.com/esvinson))
- Update passport-saml to the latest version 🚀 [\#11](https://github.com/compwright/passport-saml-metadata/pull/11) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update superagent to the latest version 🚀 [\#10](https://github.com/compwright/passport-saml-metadata/pull/10) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

### [1.5.2](https://github.com/compwright/passport-saml-metadata/tree/v1.5.2) (2018-09-11)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.5.1...v1.5.2)

**Closed issues:**

- Action required: Greenkeeper could not be activated 🚨 [\#7](https://github.com/compwright/passport-saml-metadata/issues/7)
- Action required: Greenkeeper could not be activated 🚨 [\#6](https://github.com/compwright/passport-saml-metadata/issues/6)

**Merged pull requests:**

- Update debug to the latest version 🚀 [\#9](https://github.com/compwright/passport-saml-metadata/pull/9) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

### [1.5.1](https://github.com/compwright/passport-saml-metadata/tree/v1.5.1) (2018-08-29)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.5.0...v1.5.1)

**Merged pull requests:**

- Add Greenkeeper badge 🌴 [\#8](https://github.com/compwright/passport-saml-metadata/pull/8) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

### [1.5.0](https://github.com/compwright/passport-saml-metadata/tree/v1.5.0) (2018-08-29)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.4.0...v1.5.0)

**Closed issues:**

- MetadataReader - Add Support For HTTP-POST/HTTP-Artifact Authorization Bindings [\#4](https://github.com/compwright/passport-saml-metadata/issues/4)

**Merged pull requests:**

- Adding support for alternate authorization bindings \(\#4\) [\#5](https://github.com/compwright/passport-saml-metadata/pull/5) ([TigerC10](https://github.com/TigerC10))

### [1.4.0](https://github.com/compwright/passport-saml-metadata/tree/v1.4.0) (2018-04-26)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.3.0...v1.4.0)

**Closed issues:**

- Update Dependencies [\#2](https://github.com/compwright/passport-saml-metadata/issues/2)

**Merged pull requests:**

- Updating Dependencies \(\#2\) [\#3](https://github.com/compwright/passport-saml-metadata/pull/3) ([TigerC10](https://github.com/TigerC10))
- toPassportConfig: use entryPoint for passport-saml [\#1](https://github.com/compwright/passport-saml-metadata/pull/1) ([leachiM2k](https://github.com/leachiM2k))

### [1.3.0](https://github.com/compwright/passport-saml-metadata/tree/v1.3.0) (2018-02-05)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.2.1...v1.3.0)

### [1.2.1](https://github.com/compwright/passport-saml-metadata/tree/v1.2.1) (2017-08-07)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.2.0...v1.2.1)

### [1.2.0](https://github.com/compwright/passport-saml-metadata/tree/v1.2.0) (2017-08-04)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.1.0...v1.2.0)

### [1.1.0](https://github.com/compwright/passport-saml-metadata/tree/v1.1.0) (2017-08-04)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.0.1...v1.1.0)

### [1.0.1](https://github.com/compwright/passport-saml-metadata/tree/v1.0.1) (2017-08-02)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/v1.0.0...v1.0.1)

### [1.0.0](https://github.com/compwright/passport-saml-metadata/tree/v1.0.0) (2017-08-01)

[Full Changelog](https://github.com/compwright/passport-saml-metadata/compare/a703e9840967d3b083a1abefbfaabc41a00d0454...v1.0.0)



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
