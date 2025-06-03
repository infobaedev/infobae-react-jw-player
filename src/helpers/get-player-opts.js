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
    const permutiveSegments = (window.permutive && Array.isArray(window.permutive.segments))
      ? window.permutive.segments
      : [];

    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true,
      // Se agregan como key-values para targeting
      targeting: {
        permutive: permutiveSegments.join(','),
      },
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
