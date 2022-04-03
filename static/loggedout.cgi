#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use CGI;
my $q   = CGI->new();
my $sid = $q->param('sid');
my $cookie =
"sid=$sid;Max-Age=0;domain=.becom.co.jp;path=/;samesite=none;secure;httponly";
my @headers = (
    -type    => 'text/html',
    -charset => 'utf-8',
    -cookie  => [$cookie],
);
print $q->header(@headers);
my $redirect_url = "https://auth-web.becom.co.jp/";
my $html         = <<"END_HTML";
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Refresh" content="0; URL=$redirect_url">
  <title>hello</title>
</head>
<body>
  <h1>hello</h1>
  <div>
    <p>
      ５秒以上たってもページに遷移しない場合は下記のリンクをクリックしてください。
    </p>
    <a href="$redirect_url">$redirect_url</a>
  </div>
</body>
</html>
END_HTML

print $html;

__END__
