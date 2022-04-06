#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use CGI;
my $q            = CGI->new();
my $cookie       = "sid=;Max-Age=0;domain=.becom.co.jp;path=/;";
my $redirect_url = "https://auth-web.becom.co.jp/";
my @headers      = (
    -type     => 'text/html',
    -charset  => 'utf-8',
    -cookie   => [$cookie],
    -location => $redirect_url,
);
print $q->header(@headers);

__END__
