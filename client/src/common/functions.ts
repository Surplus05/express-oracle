export function getDateString(date: Date): string {
  const SECOND_RANGE = 60;
  const MINUTE_RANGE = SECOND_RANGE * 60;
  const HOUR_RANGE = MINUTE_RANGE * 24;
  const WEEK_RANGE = HOUR_RANGE * 7;
  const MONTH_RANGE = WEEK_RANGE * 4;
  const YEAR_RANGE = MONTH_RANGE * 12;

  const now = new Date();
  const timeDifferent = Math.floor((now.getTime() - date.getTime()) / 1000);

  let dateString: string = "null";
  if (timeDifferent < SECOND_RANGE) dateString = `조금 전`;
  else if (timeDifferent >= SECOND_RANGE && timeDifferent < MINUTE_RANGE)
    dateString = `${Math.floor(timeDifferent / 60)}분 전`;
  else if (timeDifferent >= MINUTE_RANGE && timeDifferent < HOUR_RANGE)
    dateString = `${Math.floor(timeDifferent / MINUTE_RANGE)}시간 전`;
  else if (timeDifferent >= HOUR_RANGE && timeDifferent < WEEK_RANGE)
    dateString = `${Math.floor(timeDifferent / HOUR_RANGE)}일 전`;
  else if (timeDifferent >= WEEK_RANGE && timeDifferent < MONTH_RANGE)
    dateString = `${Math.floor(timeDifferent / WEEK_RANGE)}주 전`;
  else if (timeDifferent >= MONTH_RANGE && timeDifferent < YEAR_RANGE)
    dateString = `${Math.floor(timeDifferent / MONTH_RANGE)}개월 전`;
  else dateString = `${Math.floor(timeDifferent / YEAR_RANGE)}년 전`;

  return dateString;
}
