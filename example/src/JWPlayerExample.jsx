import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import ReactJWPlayer from 'infobae-react-jw-player';

const JWPlayerExample = forwardRef(({
    aspectRatio = '16:9',
    mediaId = '',
    playerId = '',
    description = '',
    name = '',
    customProps = {},
    id = 'jwplayer-example',
    showFigcaption = true,
    useMultiplePlayerScripts = true,
}, ref) => {

    const durationRef = useRef(0);
    const playerScript = `https://cdn.jwplayer.com/libraries/${playerId}.js`;
    const playlistUrl = `https://cdn.jwplayer.com/v2/media/${mediaId}`;

    // Exponer funciones externas
    useImperativeHandle(ref, () => ({
        toggleMute: () => {
            const player = window.jwplayer?.(id);
            if (player) {
                player.setMute(!player.getMute());
            }
        },
        getMuted: () => {
            const player = window.jwplayer?.(id);
            return player ? player.getMute() : true;
        },
        getPlayer: () => window.jwplayer?.(id),
        setVolume: (vol) => {
            const player = window.jwplayer?.(id);
            player?.setVolume?.(vol);
        },
    }));

    if (!mediaId || !playerId || typeof window === "undefined") return <p>Missing mediaId or playerId</p>;

    return (
        <div className="jwplayer-ctn" style={{ maxWidth: 720, margin: 'auto' }}>
            <h3>{name}</h3>

            <ReactJWPlayer
                aspectRatio={aspectRatio}
                useMultiplePlayerScripts={useMultiplePlayerScripts}
                id={id}
                playerId={id}
                playerScript={playerScript}
                playlist={playlistUrl}
                onVideoLoad={(e) => {
                    durationRef.current = e.item.duration;
                }}
                customProps={{
                    autoPause: { viewability: false },
                    generateSEOMetadata: false,
                    ...customProps,
                }}
            />

            {showFigcaption && (
                <figcaption style={{ marginTop: 8, fontStyle: 'italic', fontSize: 14 }}>
                    {description}
                </figcaption>
            )}
        </div>
    );
});

JWPlayerExample.displayName = 'JWPlayerExample';

JWPlayerExample.propTypes = {
    aspectRatio: PropTypes.string,
    mediaId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
    customProps: PropTypes.object,
    id: PropTypes.string,
    showFigcaption: PropTypes.bool,
    useMultiplePlayerScripts: PropTypes.bool,
};

export default JWPlayerExample;
