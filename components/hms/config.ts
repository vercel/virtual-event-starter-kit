export const hmsConfig = {
  /**
   * no. of tiles rendered before active speaker mode actviates
   */
  activeSpeakerThreshold: 2,
  /**
   * aspect ratio of video tiles
   */
  aspectRatio: {
    width: 1.8,
    height: 1
  },
  /**
   * maximum no.of tiles that can be rendered in speakers row
   */
  maxTileCountSpeakers: 5,
  /**
   * Turn off 100ms added things ->
   * Disable for removing Invite change role CTAs
   */
  hmsIntegration: true,
  /**
   * border color for audioLevel
   */
  audioLevelColor: '#702ec2',
  /**
   * setHmsWatermark
   */
  setHmsWatermark: true
};
