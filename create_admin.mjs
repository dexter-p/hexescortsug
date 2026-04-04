import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://dkyikirsvpauhbexbhvu.supabase.co', 'sb_publishable_NIsgsCFGKiauX5ekp9qJeQ_rfoT4Bkm');
(async () => {
   const { data, error } = await supabase.auth.signUp({
     email: 'pimpscolony@gmail.com',
     password: 'Danvid256.'
   });
   if (error) console.error("ERR:", error.message);
   else console.log('User created! ID:', data.user?.id);
})();
