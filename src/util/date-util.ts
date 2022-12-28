// Copyright 2022 The SeedV Lab (Beijing SeedV Technology Co., Ltd.)
// All Rights Reserved.

import * as moment from 'moment';

/**
 * 获取当前UTC时间字符
 * @returns 当前时间字符
 */
export function getCurDate(): string {
  return new Date().toUTCString();
}

/**
 * 获取北京时间字符
 * @param utcStr utc时间字符
 * @returns 时间字符
 */
export function getStdBJTime(utcStr: string): string {
  if (utcStr) {
    return moment(utcStr).utcOffset(8).format('YYYY/MM/DD HH:mm:ss');
  }
  return '';
}

/**
 * 获取时间戳
 * @param utcStr utc时间字符
 * @returns 时间戳
 */
export function getTimestamp(utcStr: string): number {
  if (utcStr) {
    return moment(utcStr).valueOf();
  }
  return 0;
}
