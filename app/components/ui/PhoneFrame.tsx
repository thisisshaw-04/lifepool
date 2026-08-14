import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone-stage">
      <div className="phone-device">
        <div className="phone-chassis" aria-hidden="true">
          <span className="phone-btn phone-btn-silent" />
          <span className="phone-btn phone-btn-vol-up" />
          <span className="phone-btn phone-btn-vol-down" />
          <span className="phone-btn phone-btn-power" />
        </div>
        <div className="phone-screen" style={{ backgroundColor: '#F8F8F8', backgroundImage: 'none' }}>
          <div className="phone-island">
            <span className="phone-island-sensor" />
            <span className="phone-island-cam" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
