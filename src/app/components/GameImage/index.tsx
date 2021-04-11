/**
 *
 * GameImage
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';

interface Props {
  name: string;
  size?: string;
}

export function GameImage(props: Props) {
  return (
    <Image
      className={props.name}
      style={{ height: props.size ? props.size : '128px' }}
    ></Image>
  );
}

const Image = styled.span`
  width: 100%;
  background-size: 100% 100%;
  object-fit: contain;
  display: flex;
  margin-bottom: 8px;
  max-width: 62px;

  ${media.medium`
    max-width: 100%;
  `}

  &.who-knows-you {
    background-image: url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='44' y='44.0714' width='40' height='40' rx='12' fill='%23DAE0F8'/%3E%3Cpath d='M58.0675 49.3168C64.9271 49.3168 70.4879 54.8777 70.4879 61.7373V83.4635C70.4879 90.3231 64.9271 95.8839 58.0675 95.8839H44.737L36.915 105.539C36.3733 106.208 35.2919 105.825 35.2919 104.964V95.8839H35.2583C28.3987 95.8839 22.8379 90.3231 22.8379 83.4635V61.7373C22.8379 54.8777 28.3987 49.3168 35.2583 49.3168H58.0675Z' fill='black'/%3E%3Cpath d='M71.6734 28.3952C64.8138 28.3952 59.2529 33.956 59.2529 40.8157V74.4544C59.2529 81.314 64.8138 86.8748 71.6734 86.8748H87.9033L98.2408 99.6352C98.7826 100.304 99.864 99.9208 99.864 99.0602V86.8748H99.8973C106.757 86.8748 112.318 81.314 112.318 74.4543V40.8156C112.318 33.956 106.757 28.3952 99.8973 28.3952H71.6734Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M52.3701 45.7502C59.4328 45.7502 65.1582 51.4757 65.1582 58.5383V79.5292C65.1582 86.5919 59.4328 92.3173 52.3701 92.3173H39.4071L29.9618 103.976V92.313C23.0537 92.1357 17.5082 86.4801 17.5082 79.5293V58.5383C17.5082 51.4757 23.2336 45.7502 30.2963 45.7502H52.3701Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M39.4073 92.3174H52.3704C59.4331 92.3174 65.1585 86.5919 65.1585 79.5293V58.5384C65.1585 51.4757 59.4331 45.7503 52.3704 45.7503H30.2965C23.2339 45.7503 17.5084 51.4757 17.5084 58.5384V79.5293C17.5084 86.4801 23.054 92.1357 29.9621 92.3131V103.976L39.4073 92.3174ZM28.1352 93.9854C21.0881 92.9406 15.6816 86.8666 15.6816 79.5293V58.5384C15.6816 50.4667 22.2249 43.9234 30.2965 43.9234H52.3704C60.442 43.9234 66.9854 50.4667 66.9854 58.5384V79.5293C66.9854 87.6009 60.442 94.1442 52.3704 94.1442H40.2785L31.3816 105.126C30.8945 105.728 30.0815 105.957 29.3521 105.698C28.6227 105.44 28.1352 104.75 28.1352 103.976V93.9854Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.5049 58.8763C18.5049 52.3181 23.8213 47.0016 30.3795 47.0016H52.2862C58.8444 47.0016 64.1609 52.3181 64.1609 58.8762V79.358C64.1609 85.9162 58.8444 91.2326 52.2862 91.2326H39.1984C38.6939 91.2326 38.285 90.8237 38.285 90.3192C38.285 89.8147 38.6939 89.4058 39.1984 89.4058H52.2862C57.8355 89.4058 62.334 84.9072 62.334 79.358V58.8762C62.334 53.327 57.8355 48.8285 52.2862 48.8285H30.3795C24.8303 48.8285 20.3318 53.327 20.3318 58.8763V79.358C20.3318 84.9072 24.8303 89.4058 30.3795 89.4058H31.2735C31.778 89.4058 32.1869 89.8147 32.1869 90.3192C32.1869 90.8237 31.778 91.2326 31.2735 91.2326H30.3795C23.8213 91.2326 18.5049 85.9162 18.5049 79.358V58.8763Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.8867 65.3869C24.8867 64.6302 25.5002 64.0167 26.2569 64.0167H37.5301C38.2869 64.0167 38.9003 64.6302 38.9003 65.3869C38.9003 66.1436 38.2869 66.7571 37.5301 66.7571H26.2569C25.5002 66.7571 24.8867 66.1436 24.8867 65.3869Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.8867 56.7231C24.8867 55.9663 25.5002 55.3529 26.2569 55.3529H52.8209C53.5776 55.3529 54.191 55.9663 54.191 56.7231C54.191 57.4798 53.5776 58.0932 52.8209 58.0932H26.2569C25.5002 58.0932 24.8867 57.4798 24.8867 56.7231Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.8867 73.509C24.8867 72.7523 25.5002 72.1389 26.2569 72.1389H30.9469C31.7036 72.1389 32.317 72.7523 32.317 73.509C32.317 74.2657 31.7036 74.8792 30.9469 74.8792H26.2569C25.5002 74.8792 24.8867 74.2657 24.8867 73.509Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M64.9502 23.9474C57.8875 23.9474 52.1621 29.6729 52.1621 36.7355V69.639C52.1621 76.7016 57.8875 82.4271 64.9502 82.4271H80.8129L92.7735 97.191V82.4228C99.6815 82.2453 105.227 76.5897 105.227 69.639V36.7355C105.227 29.6729 99.5015 23.9474 92.4388 23.9474H64.9502Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M80.8126 82.4271H64.9499C57.8872 82.4271 52.1618 76.7017 52.1618 69.639V36.7356C52.1618 29.6729 57.8873 23.9475 64.9499 23.9475H92.4386C99.5012 23.9475 105.227 29.6729 105.227 36.7356V69.639C105.227 76.5897 99.6812 82.2453 92.7733 82.4228V97.191L80.8126 82.4271ZM94.6001 84.0951C101.647 83.0502 107.054 76.9762 107.054 69.639V36.7356C107.054 28.6639 100.51 22.1206 92.4386 22.1206H64.9499C56.8783 22.1206 50.335 28.664 50.335 36.7356V69.639C50.335 77.7106 56.8783 84.254 64.9499 84.254H79.9415L91.3538 98.341C91.8408 98.9422 92.6539 99.1714 93.3833 98.913C94.1126 98.6547 94.6001 97.9648 94.6001 97.191V84.0951Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M53.3154 37.3325C53.3154 30.7743 58.6319 25.4579 65.1901 25.4579H92.0649C98.6231 25.4579 103.94 30.7744 103.94 37.3325V68.7732C103.94 75.3314 98.6231 80.6478 92.0649 80.6478H91.7428C91.2383 80.6478 90.8293 80.2389 90.8293 79.7344C90.8293 79.2299 91.2383 78.821 91.7428 78.821H92.0649C97.6142 78.821 102.113 74.3224 102.113 68.7732V37.3325C102.113 31.7833 97.6142 27.2848 92.0649 27.2848H65.1901C59.6408 27.2848 55.1423 31.7833 55.1423 37.3325V68.7732C55.1423 74.3224 59.6408 78.821 65.1901 78.821H81.5511C82.0556 78.821 82.4646 79.2299 82.4646 79.7344C82.4646 80.2389 82.0556 80.6478 81.5511 80.6478H65.1901C58.6319 80.6478 53.3154 75.3314 53.3154 68.7732V37.3325Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M61.797 55.8616C61.797 54.8527 62.615 54.0348 63.6239 54.0348H93.7782C94.7872 54.0348 95.6051 54.8527 95.6051 55.8616C95.6051 56.8706 94.7872 57.6885 93.7782 57.6885H63.6239C62.615 57.6885 61.797 56.8706 61.797 55.8616Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M61.797 46.3689C61.797 45.3599 62.615 44.542 63.6239 44.542H93.7782C94.7872 44.542 95.6051 45.3599 95.6051 46.3689C95.6051 47.3778 94.7872 48.1957 93.7782 48.1957H63.6239C62.615 48.1957 61.797 47.3778 61.797 46.3689Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M61.7969 37.2356C61.7969 36.2266 62.6148 35.4087 63.6237 35.4087H93.778C94.787 35.4087 95.6049 36.2266 95.6049 37.2356C95.6049 38.2445 94.787 39.0624 93.778 39.0624H63.6237C62.6148 39.0624 61.7969 38.2445 61.7969 37.2356Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M61.797 64.76C61.797 63.751 62.615 62.9331 63.6239 62.9331H79.9934C81.0023 62.9331 81.8203 63.751 81.8203 64.76C81.8203 65.7689 81.0023 66.5869 79.9934 66.5869H63.6239C62.615 66.5869 61.797 65.7689 61.797 64.76Z' fill='black'/%3E%3C/svg%3E%0A");
  }
  &.best-artist {
    background-image: url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36.9863 23.2293L26.1172 35.3256C24.9473 36.6275 25.8959 38.6978 27.6459 38.6619L100.599 37.164C102.351 37.128 103.213 35.0172 101.988 33.7653L90.2667 21.7925C90.0735 21.5951 89.8073 21.4864 89.5311 21.4922L38.4319 22.5665C37.8791 22.5781 37.3558 22.818 36.9863 23.2293Z' fill='black'/%3E%3Cpath d='M55.487 95.6829L24.3096 38.8895L38.1958 24.5744L69.5328 82.6126L55.487 95.6829Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.5564 39.8519C22.1339 39.0823 22.2628 38.1271 22.8741 37.4969L36.7603 23.1819C37.2039 22.7245 37.8389 22.5059 38.4701 22.5933C39.1012 22.6807 39.653 23.0635 39.9557 23.6242L71.2927 81.6624C71.7254 82.4638 71.5621 83.4564 70.8953 84.0768L56.8495 97.1471C56.398 97.5672 55.778 97.7555 55.1691 97.6575C54.5602 97.5594 54.0306 97.186 53.7339 96.6454L22.5564 39.8519ZM55.4871 95.6829L69.5329 82.6127L38.1958 24.5744L24.3096 38.8895L55.4871 95.6829Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M36.698 50.498C37.1805 50.2292 37.7895 50.4024 38.0583 50.8849L49.4439 71.3201C49.7127 71.8026 49.5395 72.4116 49.0571 72.6804C48.5746 72.9492 47.9656 72.776 47.6968 72.2936L36.3112 51.8583C36.0424 51.3758 36.2156 50.7668 36.698 50.498Z' fill='black'/%3E%3Cpath d='M76.5555 90.7038L103.689 37.0742L89.6436 23.4853L60.7007 80.3306L76.5555 90.7038Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M105.474 37.9772C105.87 37.195 105.71 36.2463 105.08 35.6368L91.0342 22.0479C90.5782 21.6067 89.9399 21.4081 89.3141 21.5126C88.6883 21.6172 88.1492 22.0124 87.8613 22.5779L58.9184 79.4232C58.4552 80.3329 58.7515 81.4454 59.6057 82.0042L75.4604 92.3775C75.9366 92.689 76.5229 92.783 77.0725 92.6359C77.6222 92.4887 78.0831 92.1145 78.34 91.6068L105.474 37.9772ZM76.5554 90.7039L60.7007 80.3306L89.6436 23.4853L103.689 37.0742L76.5554 90.7039Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M87.6348 36.9014C88.1312 37.1434 88.3374 37.742 88.0954 38.2385L79.902 55.0431C79.66 55.5395 79.0613 55.7457 78.5649 55.5037C78.0685 55.2617 77.8623 54.663 78.1043 54.1666L86.2977 37.362C86.5397 36.8655 87.1384 36.6593 87.6348 36.9014Z' fill='black'/%3E%3Cpath d='M85.5576 83.7652C85.5576 95.2249 76.2677 104.515 64.8081 104.515C53.3485 104.515 44.0586 95.2249 44.0586 83.7652C44.0586 72.3056 53.3485 63.0157 64.8081 63.0157C76.2677 63.0157 85.5576 72.3056 85.5576 83.7652Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M87.5576 83.7652C87.5576 96.3295 77.3723 106.515 64.8081 106.515C52.2439 106.515 42.0586 96.3295 42.0586 83.7652C42.0586 71.201 52.2439 61.0157 64.8081 61.0157C77.3723 61.0157 87.5576 71.201 87.5576 83.7652ZM64.8081 104.515C76.2677 104.515 85.5576 95.2249 85.5576 83.7652C85.5576 72.3056 76.2677 63.0157 64.8081 63.0157C53.3485 63.0157 44.0586 72.3056 44.0586 83.7652C44.0586 95.2249 53.3485 104.515 64.8081 104.515Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M78.0713 83.7652C78.0713 91.09 72.1334 97.0279 64.8086 97.0279C57.4838 97.0279 51.5459 91.09 51.5459 83.7652C51.5459 76.4404 57.4838 70.5025 64.8086 70.5025C72.1334 70.5025 78.0713 76.4404 78.0713 83.7652ZM64.8086 95.0279C71.0288 95.0279 76.0713 89.9854 76.0713 83.7652C76.0713 77.545 71.0288 72.5025 64.8086 72.5025C58.5884 72.5025 53.5459 77.545 53.5459 83.7652C53.5459 89.9854 58.5884 95.0279 64.8086 95.0279Z' fill='black'/%3E%3C/svg%3E%0A");
  }

  &.survey {
    background-image: url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5146 27.5569C20.5146 25.51 22.174 23.8506 24.221 23.8506H96.2819C98.3289 23.8506 99.9882 25.51 99.9882 27.5569V70.8851C99.9882 72.932 98.3288 74.5914 96.2819 74.5914H24.221C22.174 74.5914 20.5146 72.932 20.5146 70.8851V27.5569Z' fill='black'/%3E%3Cpath d='M16.667 23.6349C16.667 21.588 18.3264 19.9286 20.3733 19.9286H92.4342C94.4812 19.9286 96.1406 21.588 96.1406 23.6349V66.9631C96.1406 69.01 94.4812 70.6694 92.4342 70.6694H20.3733C18.3264 70.6694 16.667 69.01 16.667 66.9631V23.6349Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.8788 17.6552H91.9398C95.0102 17.6552 97.4992 20.1442 97.4992 23.2146V66.5428C97.4992 69.6132 95.0102 72.1023 91.9398 72.1023H19.8788C16.8084 72.1023 14.3193 69.6132 14.3193 66.5428V23.2146C14.3193 20.1442 16.8084 17.6552 19.8788 17.6552ZM19.8788 19.5083C17.8319 19.5083 16.1725 21.1677 16.1725 23.2146V66.5428C16.1725 68.5898 17.8319 70.2491 19.8788 70.2491H91.9398C93.9867 70.2491 95.6461 68.5898 95.6461 66.5428V23.2146C95.6461 21.1677 93.9867 19.5083 91.9398 19.5083H19.8788Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M56.667 54.9286C62.1898 54.9286 66.667 50.4514 66.667 44.9286C66.667 39.4057 62.1898 34.9286 56.667 34.9286C51.1441 34.9286 46.667 39.4057 46.667 44.9286C46.667 50.4514 51.1441 54.9286 56.667 54.9286ZM61.4144 42.593C61.7813 42.1802 61.7441 41.5481 61.3314 41.1812C60.9186 40.8143 60.2865 40.8514 59.9196 41.2642L55.3337 46.4234L53.4144 44.2642C53.0475 43.8514 52.4154 43.8143 52.0026 44.1812C51.5898 44.5481 51.5527 45.1802 51.9196 45.593L54.5862 48.593C54.776 48.8064 55.048 48.9286 55.3337 48.9286C55.6193 48.9286 55.8913 48.8064 56.0811 48.593L61.4144 42.593Z' fill='%23111111'/%3E%3Cpath d='M81.3271 106.516V103.831C81.3271 101.548 83.3786 99.8274 85.6606 99.8818C93.0902 100.059 98.8904 97.4997 102.559 94.911C104.512 93.5335 107.416 93.6359 108.854 95.5442L110.006 97.0737C111.062 98.4746 111.004 100.441 109.747 101.665C100.438 110.727 90.0524 110.966 84.03 109.916C82.4075 109.633 81.3271 108.163 81.3271 106.516Z' fill='black'/%3E%3Cpath d='M76.2211 96.4477C82.0719 102.638 90.3622 101.09 95.031 99.6789C104.368 96.8565 110.101 90.538 105.021 73.7306C104.074 70.5984 100.326 68.3131 96.7093 70.5466C95.9246 71.0312 94.9135 71.0725 94.0956 70.6464C91.0287 69.0487 88.6772 70.7227 87.3689 72.1582C86.8418 72.7364 85.7679 72.6395 85.4748 71.9141L84.0799 68.4624L82.0574 62.571C80.9991 59.0695 77.6063 56.2736 74.1048 57.3319C70.6033 58.3903 70.8473 63.4118 72.1811 67.8253L77.7145 84.532L73.1548 82.0888C71.6348 81.2744 67.965 80.0908 65.446 81.8713C62.927 83.6517 63.003 86.4312 64.8757 88.4127C66.7485 90.3942 72.4755 92.4846 76.2211 96.4477Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M74.0299 80.4553L74.4944 80.7042L70.4218 68.4078C70.4167 68.3924 70.4118 68.3769 70.407 68.3613C69.7063 66.0424 69.2392 63.4114 69.4872 61.1209C69.7374 58.8098 70.8086 56.3922 73.5685 55.558C75.9654 54.8335 78.2745 55.4588 80.0682 56.7292C81.8315 57.9779 83.1748 59.8908 83.8206 62.0002L85.8164 67.8139L86.7617 70.153C87.4666 69.523 88.3684 68.8989 89.459 68.5162C91.0668 67.952 92.9542 67.9622 94.9516 69.0029C95.1842 69.124 95.5004 69.1149 95.7355 68.9698C98.0823 67.5206 100.577 67.5067 102.632 68.4387C104.63 69.3448 106.168 71.1213 106.795 73.1944C109.393 81.7894 109.361 88.1175 107.098 92.7608C104.812 97.454 100.473 99.9697 95.567 101.453C90.8612 102.875 81.5365 104.77 74.8741 97.7205C73.1922 95.9409 71.0189 94.5373 68.9006 93.2809C68.5605 93.0792 68.2143 92.8769 67.8713 92.6765C67.1875 92.277 66.5162 91.8848 65.9298 91.5184C65.0569 90.973 64.1719 90.366 63.5288 89.6855C62.311 88.397 61.5698 86.7301 61.6633 84.9684C61.7588 83.167 62.7139 81.5328 64.3762 80.3579C66.1545 79.101 68.2304 78.9619 69.9014 79.1676C71.5809 79.3744 73.0968 79.9553 74.0299 80.4553ZM84.0797 68.4624L85.4746 71.9141C85.7678 72.6394 86.8417 72.7363 87.3687 72.1581C88.6771 70.7226 91.0286 69.0487 94.0954 70.6464C94.9133 71.0725 95.9245 71.0311 96.7092 70.5466C100.326 68.3131 104.074 70.5984 105.021 73.7306C110.101 90.5379 104.368 96.8564 95.0308 99.6788C90.362 101.09 82.0718 102.638 76.2209 96.4476C74.0268 94.1261 71.1527 92.4471 68.7718 91.0562C67.0883 90.0728 65.6513 89.2334 64.8756 88.4126C63.0028 86.4311 62.9269 83.6516 65.4459 81.8712C67.9649 80.0908 71.6347 81.2744 73.1547 82.0887L77.7144 84.5319L72.181 67.8252C70.8472 63.4118 70.6032 58.3903 74.1047 57.3319C77.6062 56.2735 80.9989 59.0694 82.0572 62.571L84.0797 68.4624Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M87.2502 77.7961C87.7474 77.6749 88.2487 77.9796 88.37 78.4768L90.6625 87.876C90.7837 88.3732 90.479 88.8745 89.9818 88.9958C89.4847 89.1171 88.9833 88.8123 88.8621 88.3152L86.5696 78.9159C86.4483 78.4187 86.753 77.9174 87.2502 77.7961Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M96.4923 76.6615C97.0025 76.6222 97.4479 77.004 97.4872 77.5143L97.9457 83.4748C97.9849 83.985 97.6031 84.4304 97.0929 84.4697C96.5827 84.5089 96.1372 84.1271 96.098 83.6169L95.6395 77.6564C95.6002 77.1462 95.9821 76.7007 96.4923 76.6615Z' fill='black'/%3E%3C/svg%3E%0A");
  }
  &.quiz {
    background-image: url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.1465 72.5776C29.1465 69.2639 31.8328 66.5776 35.1465 66.5776H108.947C109.998 66.5776 110.54 68.3297 109.788 69.0637C107.908 70.899 105.929 73.7536 105.929 77.6383C105.929 81.6481 108.038 84.6208 109.969 86.5028C110.714 87.2276 110.183 88.9049 109.144 88.9049H35.1465C31.8328 88.9049 29.1465 86.2186 29.1465 82.9049V72.5776Z' fill='black'/%3E%3Cpath d='M71.1732 30.4597C71.1732 36.225 66.896 42.9865 58.3415 42.9865C49.787 42.9865 45.5098 36.225 45.5098 30.4597C45.5098 24.2441 49.5604 22.895 53.9509 23.0261C55.7529 23.0799 58.3415 24.4518 58.3415 24.4518C58.3415 24.4518 60.9301 23.0799 62.732 23.0261C67.1226 22.895 71.1732 24.1962 71.1732 30.4597Z' fill='white' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M62.1377 39.2439C63.4743 38.727 66.3935 36.6989 67.3773 32.7211' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M58.6728 24.0348C56.0363 24.0597 53.625 22.2716 52.9883 17.1707C55.5002 18.1498 59.5913 17.691 58.6728 24.0348Z' fill='white' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M58.7158 23.9529C59.8921 22.4826 61.6564 17.938 60.1327 14.6232' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M51.285 32.1699C50.7361 31.1412 50.5811 29.4444 51.1415 28.1398' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M22.0254 50.1057C22.0254 46.792 24.7117 44.1057 28.0254 44.1057H99.5538C99.5538 44.1057 94.0148 47.6809 93.4381 54.4374C92.8614 61.1939 99.5538 64.7221 99.5538 64.7221H28.0254C24.7117 64.7221 22.0254 62.0358 22.0254 58.7221V50.1057Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M100.642 45.7835C100.641 45.7841 100.641 45.7847 100.64 45.7853L100.62 45.7985C100.595 45.8159 100.551 45.8465 100.491 45.8901C100.371 45.9774 100.188 46.1163 99.9605 46.3056C99.5049 46.6858 98.8831 47.2611 98.2451 48.0225C96.9646 49.5504 95.6741 51.7572 95.4309 54.6075C95.2068 57.2327 96.3743 59.274 97.7462 60.7536C98.4297 61.4907 99.1351 62.0535 99.6702 62.4311C99.9358 62.6185 100.154 62.7567 100.3 62.8446C100.373 62.8885 100.427 62.9195 100.459 62.9376C100.475 62.9467 100.486 62.9525 100.491 62.9551L100.489 62.9543L100.488 62.9536C100.489 62.9545 100.491 62.9553 100.493 62.9562C101.302 63.3865 101.716 64.3122 101.495 65.2025C101.274 66.0951 100.473 66.7221 99.5538 66.7221H28.0254C23.6071 66.7221 20.0254 63.1404 20.0254 58.7221V50.1057C20.0254 45.6874 23.6071 42.1057 28.0254 42.1057H99.5538C100.441 42.1057 101.222 42.6897 101.472 43.5404C101.722 44.3886 101.385 45.2999 100.645 45.7819C100.644 45.7825 100.643 45.783 100.642 45.7835ZM96.8809 62.7221C98.2734 64.0471 99.5538 64.7221 99.5538 64.7221H28.0254C24.7117 64.7221 22.0254 62.0358 22.0254 58.7221V50.1057C22.0254 46.792 24.7117 44.1057 28.0254 44.1057H99.5538C99.5538 44.1057 98.5041 44.7832 97.2711 46.1057C95.6717 47.8212 93.7637 50.6221 93.4381 54.4374C93.1137 58.2385 95.09 61.0179 96.8809 62.7221Z' fill='black'/%3E%3Cpath d='M16.8926 96.7604C16.8926 93.4467 19.5789 90.7604 22.8926 90.7604H94.421C94.421 90.7604 89.3973 93.9012 88.563 100.937C87.7286 107.974 94.421 111.377 94.421 111.377H22.8926C19.5789 111.377 16.8926 108.69 16.8926 105.377V96.7604Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M95.4862 92.4531C95.486 92.4532 95.4864 92.453 95.4862 92.4531C95.4851 92.4538 95.484 92.4545 95.4829 92.4552C95.4828 92.4552 95.4829 92.4551 95.4829 92.4552M92.188 92.7604C93.392 91.4037 94.421 90.7604 94.421 90.7604H22.8926C19.5789 90.7604 16.8926 93.4467 16.8926 96.7604V105.377C16.8926 108.69 19.5789 111.377 22.8926 111.377H94.421C94.421 111.377 93.1228 110.717 91.7413 109.377C89.986 107.674 88.0961 104.875 88.563 100.937C89.0197 97.0857 90.7318 94.4013 92.188 92.7604ZM95.329 109.595C95.3309 109.596 95.3329 109.597 95.3348 109.598C95.3358 109.598 95.3356 109.598 95.3348 109.598C96.1546 110.019 96.5808 110.946 96.3659 111.843C96.1503 112.742 95.346 113.377 94.421 113.377H22.8926C18.4743 113.377 14.8926 109.795 14.8926 105.377V96.7604C14.8926 92.3421 18.4743 88.7604 22.8926 88.7604H94.421C95.3131 88.7604 96.0974 89.3513 96.3434 90.2089C96.5883 91.0626 96.2408 91.9751 95.4913 92.4498C95.4898 92.4508 95.4877 92.4521 95.4862 92.4531M95.3336 109.597C95.3296 109.595 95.3196 109.59 95.3042 109.581C95.2734 109.564 95.2208 109.535 95.1499 109.493C95.0076 109.41 94.7934 109.277 94.5333 109.095C94.0092 108.729 93.3207 108.18 92.6608 107.452C91.3492 106.006 90.2201 103.947 90.5491 101.173C90.9127 98.1065 92.1824 95.9092 93.3536 94.4758C93.9413 93.7565 94.5022 93.2327 94.9053 92.8959C95.1064 92.7279 95.2665 92.6079 95.3686 92.5346C95.4196 92.4981 95.456 92.4733 95.4755 92.4603L95.4862 92.4531L95.4841 92.4544L95.4829 92.4552M95.3336 109.597L95.3325 109.597L95.3303 109.595' fill='black'/%3E%3Cpath d='M35.1377 72.6205H81.7596' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M35.1377 77.7415H60.5873' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M76.9473 43.4194H85.2341V55.6798C85.2341 56.5707 84.1569 57.0169 83.527 56.3869L81.7978 54.6577C81.4073 54.2672 80.7741 54.2672 80.3836 54.6577L78.6544 56.3869C78.0244 57.0169 76.9473 56.5707 76.9473 55.6798V43.4194Z' fill='black'/%3E%3Cpath d='M21.4502 95.9478H68.0721' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21.4502 101.069H46.8998' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M27.4385 49.4528H66.5752' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }

  &.draw-and-guess {
    background-image: url("data:image/svg+xml,%3Csvg width='129' height='128' viewBox='0 0 129 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.8926 38.5947C18.8926 35.747 21.2011 33.4385 24.0488 33.4385H111.354C114.202 33.4385 116.511 35.747 116.511 38.5947V95.809C116.511 98.6567 114.202 100.965 111.354 100.965H24.0488C21.2011 100.965 18.8926 98.6567 18.8926 95.809V38.5947Z' fill='black'/%3E%3Cpath d='M14.208 33.9098C14.208 31.0621 16.5165 28.7535 19.3643 28.7535H106.67C109.518 28.7535 111.826 31.0621 111.826 33.9098V91.124C111.826 93.9717 109.518 96.2803 106.67 96.2803H19.3643C16.5165 96.2803 14.208 93.9717 14.208 91.124V33.9098Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.3643 27.0348H106.67C110.467 27.0348 113.545 30.1128 113.545 33.9098V91.124C113.545 94.921 110.467 97.999 106.67 97.999H19.3643C15.5673 97.999 12.4893 94.921 12.4893 91.124V33.9098C12.4893 30.1128 15.5673 27.0348 19.3643 27.0348ZM19.3643 28.7535C16.5165 28.7535 14.208 31.0621 14.208 33.9098V91.124C14.208 93.9717 16.5165 96.2803 19.3643 96.2803H106.67C109.518 96.2803 111.826 93.9717 111.826 91.124V33.9098C111.826 31.0621 109.518 28.7535 106.67 28.7535H19.3643Z' fill='black'/%3E%3Cpath d='M19.25 44.4896C19.25 42.9976 20.5026 41.7501 22.0954 41.7501H63.9046C65.4974 41.7501 66.75 42.9976 66.75 44.4896V66.5107C66.75 68.0026 65.4974 69.2501 63.9046 69.2501H22.0954C20.5026 69.2501 19.25 68.0026 19.25 66.5107V44.4896Z' fill='white' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75.5 45.8595C75.5 45.3849 75.8848 45.0001 76.3594 45.0001H90.4869C90.9615 45.0001 91.3463 45.3849 91.3463 45.8595C91.3463 46.3341 90.9615 46.7189 90.4869 46.7189H76.3594C75.8848 46.7189 75.5 46.3341 75.5 45.8595Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75.501 49.3651C75.501 48.8905 75.8857 48.5057 76.3604 48.5057H84.0722C84.5468 48.5057 84.9316 48.8905 84.9316 49.3651C84.9316 49.8397 84.5468 50.2245 84.0722 50.2245H76.3604C75.8857 50.2245 75.501 49.8397 75.501 49.3651Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75.5 80.6764C75.5 80.2018 75.8848 79.817 76.3594 79.817H90.4869C90.9615 79.817 91.3463 80.2018 91.3463 80.6764C91.3463 81.151 90.9615 81.5358 90.4869 81.5358H76.3594C75.8848 81.5358 75.5 81.151 75.5 80.6764Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75.501 84.182C75.501 83.7074 75.8857 83.3226 76.3604 83.3226H84.0722C84.5468 83.3226 84.9316 83.7074 84.9316 84.182C84.9316 84.6566 84.5468 85.0414 84.0722 85.0414H76.3604C75.8857 85.0414 75.501 84.6566 75.501 84.182Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75.5 61.9369C75.5 61.4623 75.8848 61.0775 76.3594 61.0775H90.4869C90.9615 61.0775 91.3463 61.4623 91.3463 61.9369C91.3463 62.4115 90.9615 62.7963 90.4869 62.7963H76.3594C75.8848 62.7963 75.5 62.4115 75.5 61.9369Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75.501 65.4424C75.501 64.9678 75.8857 64.5831 76.3604 64.5831H84.0722C84.5468 64.5831 84.9316 64.9678 84.9316 65.4424C84.9316 65.9171 84.5468 66.3018 84.0722 66.3018H76.3604C75.8857 66.3018 75.501 65.9171 75.501 65.4424Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M74.2402 40.337L104 40.3369C105.898 40.3369 107.437 41.8759 107.437 43.7744V87.7812C107.437 89.6797 105.898 91.2188 104 91.2188L74.2402 91.2188C72.3418 91.2188 70.8027 89.6798 70.8027 87.7813V43.7745C70.8027 41.876 72.3418 40.337 74.2402 40.337ZM74.2402 42.0557C73.291 42.0557 72.5215 42.8252 72.5215 43.7745V87.7813C72.5215 88.7305 73.291 89.5 74.2402 89.5L104 89.5C104.949 89.5 105.718 88.7305 105.718 87.7812V43.7744C105.718 42.8252 104.949 42.0557 104 42.0557L74.2402 42.0557Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M21.2186 32.5778H105.038C106.519 32.5778 107.719 33.7779 107.719 35.2583C107.719 36.7387 106.519 37.9388 105.038 37.9388H21.2186C19.7382 37.9388 18.5381 36.7387 18.5381 35.2583C18.5381 33.7779 19.7382 32.5778 21.2186 32.5778ZM21.2186 34.2966C20.6874 34.2966 20.2568 34.7272 20.2568 35.2583C20.2568 35.7895 20.6874 36.2201 21.2186 36.2201H105.038C105.569 36.2201 106 35.7895 106 35.2583C106 34.7272 105.569 34.2966 105.038 34.2966H21.2186Z' fill='black'/%3E%3C/svg%3E%0A");
  }

  &.most-likely {
    background-image: url("data:image/svg+xml,%3Csvg width='128' height='134' viewBox='0 0 128 134' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d)'%3E%3Ccircle cx='96' cy='103.429' r='26.5' fill='white'/%3E%3Ccircle cx='96' cy='103.429' r='25.5' stroke='black' stroke-width='2'/%3E%3C/g%3E%3Cpath d='M109.129 100.849C110.121 109.383 97.3923 116.935 82.3118 110.881' stroke='black' stroke-width='2'/%3E%3Cellipse rx='4.5' ry='5' transform='matrix(-0.989718 0.143036 0.143036 0.989718 107.804 71.0024)' fill='black'/%3E%3Cellipse rx='4.5' ry='5' transform='matrix(-0.98843 0.15168 0.15168 0.98843 75.5859 74.4572)' fill='black'/%3E%3Cpath d='M91.0086 79.0509C91.8617 85.9987 89.0581 91.8842 89.0581 91.8842C89.0581 91.8842 91.1606 94.6486 96.0015 93.0467' stroke='black' stroke-width='2'/%3E%3Cg filter='url(%23filter1_d)'%3E%3Ccircle cx='28.999' cy='49.4285' r='26.5' fill='white'/%3E%3Ccircle cx='28.999' cy='49.4285' r='25.5' stroke='black' stroke-width='2'/%3E%3C/g%3E%3Cpath d='M13.7998 45.8488C12.8073 54.3826 25.5364 61.9345 40.6169 55.8814' stroke='black' stroke-width='2'/%3E%3Cellipse cx='21.1243' cy='17.0024' rx='4.5' ry='5' transform='rotate(8.22354 21.1243 17.0024)' fill='black'/%3E%3Cellipse cx='53.3429' cy='20.4572' rx='4.5' ry='5' transform='rotate(8.72432 53.3429 20.4572)' fill='black'/%3E%3Cpath d='M31.9211 24.0509C31.068 30.9987 33.8716 36.8842 33.8716 36.8842C33.8716 36.8842 31.7691 39.6486 26.9282 38.0467' stroke='black' stroke-width='2'/%3E%3Cdefs%3E%3Cfilter id='filter0_d' x='69.5' y='76.9286' width='57' height='57' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dx='4' dy='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3E%3C/filter%3E%3Cfilter id='filter1_d' x='2.49902' y='22.9285' width='57' height='57' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dx='4' dy='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");
  }
`;
