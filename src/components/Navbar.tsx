import React, { useState } from 'react';
import { Film, Copy, Check, Users, Crown, LogOut, Radio } from 'lucide-react';

interface NavbarProps {
  roomId: string;
  isHost: boolean;
  nickname: string;
  userCount: number;
  isConnected: boolean;
  onLeaveRoom: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  roomId,
  isHost,
  nickname,
  userCount,
  isConnected,
  onLeaveRoom,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-600/20">
          <Film className="w-4 h-4" />
        </div>
        <span className="font-bold text-white text-sm md:text-base tracking-tight hidden sm:inline">
          SyncWatch Party
        </span>
      </div>

      {/* Center: Room Code Pill & Share */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full pl-3 pr-1.5 py-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-300">
            <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
            <span className="text-neutral-500">ID:</span>
            <strong className="text-white tracking-wider uppercase">{roomId}</strong>
          </div>
          <button
            onClick={handleCopyLink}
            className="ml-2 p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
            title="Скопировать ссылку на комнату"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Right: User Info & Controls */}
      <div className="flex items-center gap-2.5">
        {/* Role Badge */}
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            isHost
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'bg-neutral-800 text-neutral-300 border border-neutral-700/60'
          }`}
        >
          {isHost && <Crown className="w-3 h-3 fill-amber-400 text-amber-400" />}
          <span className="hidden sm:inline">{isHost ? 'Хост:' : 'Зритель:'}</span>
          <span className="truncate max-w-[80px] sm:max-w-[120px]">{nickname}</span>
        </div>

        {/* Online Count */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-white">{userCount}</span>
        </div>

        {/* Leave Room Button */}
        <button
          onClick={onLeaveRoom}
          className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 transition cursor-pointer"
          title="Покинуть комнату"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
