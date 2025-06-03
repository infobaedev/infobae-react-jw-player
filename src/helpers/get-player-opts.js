function getPlayerOpts(opts) {
  const {
    aspectRatio,
    customProps = {},
    file,
    generatePrerollUrl,
    image,
    isAutoPlay,
    isMuted,
    licenseKey,
    playlist,
  } = opts;

  const hasAdvertising = !!generatePrerollUrl;

  const playerOpts = {};

  if (licenseKey) {
    playerOpts.key = licenseKey;
  }

  if (playlist) {
    playerOpts.playlist = playlist;
  } else if (file) {
    playerOpts.file = file;
  }

  if (aspectRatio && aspectRatio !== 'inherit') {
    playerOpts.aspectratio = aspectRatio;
  }

  if (hasAdvertising) {
    let playerSegsPerm = '';
    try {
      if (typeof window !== 'undefined'){
        const segs = JSON.parse(localStorage.getItem('_pdfps'));
        if (Array.isArray(segs)) {
          playerSegsPerm = segs.join(',');
        }
      }
    } catch (e) {
      console.warn('No se pudieron leer los segmentos de Permutive:', e);
    }

    const hasQuery = generatePrerollUrl.includes('?');
    const encodedCustParams = `cust_params=permutive%3D${encodeURIComponent(playerSegsPerm)}`;
    const finalTagUrl = generatePrerollUrl + (hasQuery ? '&' : '?') + encodedCustParams;

    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true,
      tag: finalTagUrl,
    };
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (typeof isMuted !== 'undefined') {
    playerOpts.mute = !!isMuted;
  }

  if (image) {
    playerOpts.image = image;
  }

  return Object.assign(playerOpts, customProps);
}

export default getPlayerOpts;
