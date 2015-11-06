using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RecTiles
{
    class Program
    {
        static FileStream s_fs;
        static string images_path;
        static int width;
        static int height;

        static ArrayList s_array = new ArrayList();

        /*
         <?xml version="1.0" encoding="UTF-8"?>
        <tileset name="glass_dry2" firstgid="0" tilewidth="72" tileheight="72">
         <image source="../../../../../../../../my_program/wynowar/wesnoth-1.10/data/core/images/terrain/grass/dry2.png"/>
        </tileset>
         */
        static string getDataString(string name, string path, int width, int height)
        {
            return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<tileset name=\"" + name + "\" firstgid=\"0\" tilewidth=\"" + width +
                    "\" tileheight=\"" + height + "\">\n<image source=" + "\"" + path + "\"/>\n</tileset>";
        }

        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                return;
            }
            images_path = args[0];
            string w = args[1];
            string h = args[2];
            width = int.Parse(w);
            height = int.Parse(h);
            DirectoryInfo theFolder = new DirectoryInfo(images_path);
            s_array.Clear();
            foreach (FileInfo nextFile in theFolder.GetFiles())
            {
                Console.WriteLine(nextFile.Name);
                string path = nextFile.FullName;              
                s_array.Add(path);
            }
            GenLongPng(theFolder.Name);
            RecurseFolder(theFolder);
            Thread.Sleep(2000);
        }

        private static void RecurseFolder(DirectoryInfo theFolder)
        {
            DirectoryInfo[] dirInfo = theFolder.GetDirectories();
            foreach (DirectoryInfo nextFolder in dirInfo)
            {
                RecurseFolder(nextFolder);
                FileInfo[] fileInfo = nextFolder.GetFiles();
                s_array.Clear();
                foreach (FileInfo nextFile in fileInfo)
                {
                    Console.WriteLine(nextFile.Name);
                    string path = nextFile.FullName;
                    s_array.Add(path);
                }
                GenLongPng(nextFolder.Name);
            }
        }

        private static void GenLongPng(string filename)
        {
            Bitmap bitmap = new Bitmap(s_array.Count*width, height);
            Graphics g = Graphics.FromImage(bitmap);
            g.Clear(Color.Transparent);
            int i = 0;
            foreach (string path in s_array)
            {
                if (!path.Contains("png"))
                    continue;
                System.Drawing.Image img = System.Drawing.Image.FromFile(path);
                g.DrawImage(img, i * width, 0);
                i++;
            }
            g.Save();
            g.Dispose();
            bitmap.Save(filename + ".png", ImageFormat.Png);
        }

        private static void CreateFile(string filename, string strdata)
        {
            s_fs = new FileStream(filename, FileMode.Create);
            byte[] data = new UTF8Encoding().GetBytes(strdata);
            s_fs.Write(data, 0, data.Length);
            s_fs.Flush();
            s_fs.Close();
        }
    }
}
