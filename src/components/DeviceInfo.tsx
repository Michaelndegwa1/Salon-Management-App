import { useEffect, useState } from 'react';

export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    os: 'unknown',
    browser: 'unknown'
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const width = window.innerWidth;

    // Detect OS
    let os = 'unknown';
    if (/Android/i.test(userAgent)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS';
    else if (/Mac OS X/i.test(userAgent)) os = 'macOS';
    else if (/Windows/i.test(userAgent)) os = 'Windows';
    else if (/Linux/i.test(userAgent)) os = 'Linux';

    // Detect browser
    let browser = 'unknown';
    if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) browser = 'Chrome';
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'Safari';
    else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/Edge/i.test(userAgent)) browser = 'Edge';

    // Detect device type
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isMobile = isMobileDevice || width < 768;
    const isTablet = isMobileDevice && width >= 768 && width < 1024;
    const isDesktop = !isMobileDevice && width >= 1024;

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      os,
      browser
    });
  }, []);

  return deviceInfo;
}
