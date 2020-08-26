import {Month} from '../const.js';
import moment from "moment";

export const getDurationString = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const getDateString = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day} ${Month[month]} ${year}`;
};

export const formatDateString = (date) => {
  /* if (!(date instanceof Date)) {
    return ``;
  }*/
  return moment(date).format(`DD MMMM YYYY`);
};

export const getCommentDateString = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${year}/${month}/${day} ${hour > 9 ? hour : `0${hour}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const formatCommentDateString = (date) => {
  /* if (!(date instanceof Date)) {
    return ``;
  }*/
  return moment(date).fromNow();
};

export const getCommentString = (comments) => `${comments.length} comment${comments.length === 1 ? `` : `s`}`;
