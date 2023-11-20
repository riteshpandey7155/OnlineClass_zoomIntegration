const axios = require('axios');
export let DATA = JSON.stringify({
  "topic": "test postman",
  "type": 2,
  "start_time": "2021-11-17T15:04:10Z",
  "duration": "3",
  "settings": {
    "host_video": true,
    "participant_video": true,
    "join_before_host": true,
    "mute_upon_entry": "true",
    "watermark": "true",
    "audio": "voip",
    "auto_recording": "cloud"
  }
});

export let CONFIG = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.zoom.us/v2/users/me/meetings',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImI3M2U3YzVmLWRjNzItNDkxMS04YWZhLWRiMjliZjkxZWRkYiJ9.eyJ2ZXIiOjksImF1aWQiOiIyYjc5YWE0MmFmN2I4YmYyM2NmYzM4OGY4MjNkZmZmYiIsImNvZGUiOiJTUXRvQkJZamREakJNeDNBaUtiUXVDSjRKRFZzbERZYnciLCJpc3MiOiJ6bTpjaWQ6ejhORURLY3ZSREdnVkZvWUJMNW1fdyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI3SFI0eGRuOVRzYXdPTUE1UG1XdUdnIiwibmJmIjoxNzAwMjEwMjUwLCJleHAiOjE3MDAyMTM4NTAsImlhdCI6MTcwMDIxMDI1MCwiYWlkIjoiYWNDSXVTdjVUNGVELW5seEJOOEdTUSJ9.m7wdV3wUQP563YxrnGTPkGd3JY96bCp2myxDgcT9xscQSU0ULpDyACIbr-1Wc3-aAc44seEoF7vHA85ir8AEBQ', 
    'Cookie': '__cf_bm=6NiCQE.65FsglLBpqTOJeW2ZnWqVmy0TFracNiv8R3c-1700210250-0-AZYt06qs33atmgV70mA1IFKCZHuhWFX3RdKaunEQlEnMo58/KetINFqPQupOkzl7uNUiV6x8cjWrbwdtLWzELhE=; _zm_cms_guid=evic1oBoczTuNMzX4RWcEmf7xfu4uBnJoASqRKceiN3jJE4P4rdVeNIuAB5lSqMvu6hA4MgrNVRZ37_o8tHP15esS8fTlew.660J4o0KNyJElNhM; _zm_mtk_guid=bb31b6915b924e3b84f6f6db0f761127; _zm_page_auth=us04_c_5WC-c_drQHyzXHSBv8RT0A; _zm_ssid=us04_c_4isgeeDGRXGUPVryIY_fuQ; cred=CCB685CCA23DC21B55A890563189BCA4'
  },
  data : DATA
};


