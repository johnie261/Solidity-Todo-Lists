{ pkgs }: {
	deps = [
		pkgs.openssh_with_kerberos
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.yarn
        pkgs.replitPackages.jest
        pkgs.python38Full
	];
}