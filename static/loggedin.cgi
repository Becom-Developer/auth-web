#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use CGI;
my $q   = CGI->new();
my $sid = $q->param('sid');
my $cookie =
"sid=$sid;Max-Age=100000;domain=.becom.co.jp;path=/;samesite=none;secure;httponly";
my $redirect_url = "https://auth-web.becom.co.jp/";
my @headers      = (
    -type     => 'text/html',
    -charset  => 'utf-8',
    -cookie   => [$cookie],
    -location => $redirect_url,
);
print $q->header(@headers);

__END__
