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
      if (typeof window !== 'undefined') {
        const segs = JSON.parse(localStorage.getItem('_pdfps') || '[]');
        if (Array.isArray(segs)) {
          playerSegsPerm = segs.slice(0, 250).join(',');
        }
      }
    } catch (e) {
      console.warn('No se pudieron leer los segmentos de Permutive:', e);
    }

    const custParams = {
      'video-id': '92347',
      'video-channel': 'c-suite',
      'video-campaign': '',
      'video-series': '',
      'video-category': 'it-management,internet-of-things,cio-role',
      'video-tag': '',
      devsite: 'false',
      permutive: playerSegsPerm,
    };

    let custParamsStr = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const key in custParams) {
      if (custParamsStr !== '') custParamsStr += '&';
      custParamsStr += `${encodeURIComponent(key)}=${encodeURIComponent(custParams[key])}`;
    }

    const hasQuery = generatePrerollUrl.includes('?');
    const finalTagUrl = `${generatePrerollUrl + (hasQuery ? '&' : '?')}cust_params=${encodeURIComponent(custParamsStr)}`;

    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad - xxs left',
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
