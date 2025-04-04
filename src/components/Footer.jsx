import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto mt-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CineLuxe</h3>
            <p className="text-sm text-gray-400">Experience the magic of cinema in ultimate comfort and style.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Now Showing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Coming Soon
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Cinemas
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Offers & Promotions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Genres</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[var(--principal)] transition-colors">
                  Sci-Fi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-[var(--principal)] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-[var(--principal)] transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-[var(--principal)] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-[var(--principal)] transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} CineLuxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

