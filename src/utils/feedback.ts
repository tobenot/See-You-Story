export const FEEDBACK_URL = 'https://www.xiaohongshu.com/user/profile/5c03942800000000050142ab?xsec_token=YB8HL63nyDW9OXifkkclhjer0ItPf2n4nEDkKdQh_L05c%3D&xsec_source=app_share&xhsshare=CopyLink&appuid=5c03942800000000050142ab&apptime=1742223016&share_id=8c1c748f7a8e4c98819ca3841f68f6ff&share_channel=copy_link';

export const openFeedback = () => {
  window.open(FEEDBACK_URL, '_blank');
}; 