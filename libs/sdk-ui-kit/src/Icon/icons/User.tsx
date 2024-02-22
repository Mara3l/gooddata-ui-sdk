// (C) 2021-2024 GoodData Corporation
import React from "react";

import { IIconProps } from "../typings.js";

export interface IUserIconProps extends IIconProps {
    backgroundColor?: string;
}

/**
 * @internal
 */
export const User: React.FC<IUserIconProps> = ({
    color = "#94A1AD",
    backgroundColor = "#EBEFF4",
    className,
    width,
    height,
}) => {
    return (
        <svg
            className={className}
            width={width ?? 27}
            height={height ?? 27}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="27" height="27" rx="13.5" fill={backgroundColor} />
            <path
                d="M13.1514 13.9014C12.6182 13.9014 12.1169 13.8011 11.6475 13.6006C11.1826 13.3955 10.7747 13.1198 10.4238 12.7734C10.0775 12.4225 9.80404 12.0146 9.60352 11.5498C9.40299 11.0804 9.30273 10.5814 9.30273 10.0527C9.30273 9.51953 9.40299 9.02051 9.60352 8.55566C9.80404 8.08626 10.0775 7.67839 10.4238 7.33203C10.7747 6.98112 11.1826 6.7054 11.6475 6.50488C12.1169 6.2998 12.6182 6.19727 13.1514 6.19727C13.68 6.19727 14.1768 6.2998 14.6416 6.50488C15.111 6.7054 15.5189 6.98112 15.8652 7.33203C16.2161 7.67839 16.4919 8.08626 16.6924 8.55566C16.8975 9.02051 17 9.51953 17 10.0527C17 10.5814 16.8975 11.0804 16.6924 11.5498C16.4919 12.0146 16.2161 12.4225 15.8652 12.7734C15.5189 13.1198 15.111 13.3955 14.6416 13.6006C14.1768 13.8011 13.68 13.9014 13.1514 13.9014ZM13.1514 6.90137C12.7184 6.90137 12.3105 6.9834 11.9277 7.14746C11.5449 7.31152 11.21 7.53711 10.9229 7.82422C10.6403 8.10677 10.4147 8.43945 10.2461 8.82227C10.082 9.20508 10 9.61523 10 10.0527C10 10.4857 10.082 10.8936 10.2461 11.2764C10.4147 11.6592 10.6403 11.9941 10.9229 12.2812C11.21 12.5638 11.5449 12.7871 11.9277 12.9512C12.3105 13.1152 12.7184 13.1973 13.1514 13.1973C13.5843 13.1973 13.9922 13.1152 14.375 12.9512C14.7578 12.7871 15.0905 12.5638 15.373 12.2812C15.6602 11.9941 15.8857 11.6592 16.0498 11.2764C16.2184 10.8936 16.3027 10.4857 16.3027 10.0527C16.3027 9.61523 16.2184 9.20508 16.0498 8.82227C15.8857 8.43945 15.6602 8.10677 15.373 7.82422C15.0905 7.53711 14.7578 7.31152 14.375 7.14746C13.9922 6.9834 13.5843 6.90137 13.1514 6.90137ZM18.75 20.1973H7.55273C7.26107 20.1973 7.0127 20.0947 6.80762 19.8896C6.60254 19.6846 6.5 19.4385 6.5 19.1514C6.5 19.1377 6.50456 19.0625 6.51367 18.9258C6.52279 18.7891 6.55469 18.6136 6.60938 18.3994C6.66406 18.1852 6.74837 17.9437 6.8623 17.6748C6.98079 17.4014 7.14486 17.1234 7.35449 16.8408C7.4821 16.6768 7.61882 16.5218 7.76465 16.376C7.91048 16.2256 8.06543 16.0866 8.22949 15.959C8.39811 15.8268 8.57585 15.7061 8.7627 15.5967C8.9541 15.4827 9.15462 15.3802 9.36426 15.2891C9.61947 15.1751 9.89062 15.0749 10.1777 14.9883C10.4648 14.9017 10.7656 14.8311 11.0801 14.7764C11.3991 14.7171 11.7295 14.6738 12.0713 14.6465C12.4176 14.6146 12.7777 14.5986 13.1514 14.5986C13.5205 14.5986 13.8783 14.6146 14.2246 14.6465C14.571 14.6738 14.9014 14.7171 15.2158 14.7764C15.5303 14.8311 15.8311 14.9017 16.1182 14.9883C16.4053 15.0749 16.6764 15.1751 16.9316 15.2891C17.1413 15.3802 17.3395 15.4827 17.5264 15.5967C17.7178 15.7061 17.8978 15.8268 18.0664 15.959C18.235 16.0866 18.3923 16.2256 18.5381 16.376C18.6839 16.5218 18.8184 16.6768 18.9414 16.8408C19.1556 17.1234 19.3197 17.4014 19.4336 17.6748C19.5475 17.9437 19.6318 18.1852 19.6865 18.3994C19.7412 18.6136 19.7731 18.7891 19.7822 18.9258C19.7959 19.0625 19.8027 19.1377 19.8027 19.1514C19.8027 19.4385 19.7002 19.6846 19.4951 19.8896C19.29 20.0947 19.0417 20.1973 18.75 20.1973ZM13.1514 15.3027C12.5407 15.3027 11.971 15.3438 11.4424 15.4258C10.9137 15.5078 10.4307 15.6309 9.99316 15.7949C9.55566 15.9544 9.16374 16.1549 8.81738 16.3965C8.47559 16.638 8.18392 16.916 7.94238 17.2305C7.76009 17.4674 7.61882 17.6999 7.51855 17.9277C7.41829 18.1556 7.3431 18.3607 7.29297 18.543C7.2474 18.7207 7.22005 18.8665 7.21094 18.9805C7.20182 19.0898 7.19727 19.1468 7.19727 19.1514C7.19727 19.2471 7.23145 19.3291 7.2998 19.3975C7.36816 19.4658 7.45247 19.5 7.55273 19.5H18.75C18.8457 19.5 18.9277 19.4658 18.9961 19.3975C19.0645 19.3291 19.0986 19.2471 19.0986 19.1514C19.0986 19.1468 19.0941 19.0898 19.085 18.9805C19.0758 18.8665 19.0462 18.7207 18.9961 18.543C18.9505 18.3607 18.8776 18.1556 18.7773 17.9277C18.6816 17.6999 18.5426 17.4674 18.3604 17.2305C18.1188 16.916 17.8249 16.638 17.4785 16.3965C17.1367 16.1549 16.7448 15.9544 16.3027 15.7949C15.8652 15.6309 15.3822 15.5078 14.8535 15.4258C14.3294 15.3438 13.762 15.3027 13.1514 15.3027Z"
                fill={color}
            />
        </svg>
    );
};
