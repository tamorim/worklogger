#!/usr/bin/env node

import yargs from 'yargs'
import {join} from 'path'
import {homedir} from 'os'
import moment from 'moment'
import {curry, __} from 'ramda'
import {IO} from 'ramda-fantasy'
import {createFileSync, readFileSync} from 'fs-extra'

const getFolder = () =>
  IO(() => join(homedir(), '.worklogger/'))

const getDefaultYear = () =>
  IO(() => moment().format('YYYY'))

const joinIO = curry((a, b) =>
  IO(() => join(a, b))
)

const getYearFolder = year =>
  getFolder()
    .chain(joinIO(__, year))

const createFileIO = curry((filename, content) =>
  IO(() => createFileSync(filename, content, 'utf8'))
)

const readFileIO = filename =>
  IO(() => readFileSync(filename, 'utf8'))

const create = ({month}) =>
  getDefaultYear()
    .chain(getYearFolder)
    .chain(joinIO(__, month))
    .chain(createFileIO(__, ''))
    .runIO()

const checkin = ({date, time}) =>
  console.log(date, time)

const lunch = ({date, time}) =>
  console.log(date, time)

const back = ({date, time}) =>
  console.log(date, time)

const checkout = ({date, time}) =>
  console.log(date, time)

yargs
  .command('create [month]', 'create a worksheet', {}, create)
  .command('checkin [date] [time]', 'check in your arrival', {}, checkin)
  .command('lunch [date] [time]', 'lunch break', {}, lunch)
  .command('back [date] [time]', 'back from break', {}, back)
  .command('checkout [date] [time]', 'time to go home', {}, checkout)
  .help()
  .argv
