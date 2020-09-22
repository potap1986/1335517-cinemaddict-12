import moment from "moment";

export const getDurationString = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const formatDateString = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDateString = (date) => {
  return moment(date).fromNow();
};

export const getCommentString = (comments) => `${comments.length} comment${comments.length === 1 ? `` : `s`}`;
