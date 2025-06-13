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
        const segs = JSON.parse(localStorage.getItem('_pdfps') || '[]') || [];
        if (Array.isArray(segs)) {
          playerSegsPerm = segs.slice(0, 250).join(',');
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('No se pudieron leer los segmentos de Permutive:', e);
    }

    const hasQuery = generatePrerollUrl.includes('?');
    const encodedPermutive = `permutive=${encodeURIComponent(playerSegsPerm)}`;
    const encodedCustParams = `cust_params=video-id%3D92347%26video-channel%3Dc-suite%26video-campaign%3D%26video-series%3D%26video-category%3Dit-management%2Cinternet-of-things%2Ccio-role%26video-tag%3D%26devsite%3Dfalse%26permutive%3D${encodeURIComponent(playerSegsPerm)}`;
    const permutiveTagUrl = generatePrerollUrl + (hasQuery ? '&' : '?') + encodedPermutive;
    const permutiveHasQuery = permutiveTagUrl.includes('?');
    const finalTagUrl = permutiveTagUrl + (permutiveHasQuery ? '&' : '?') + encodedCustParams;

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
